package org.gusqwen.intellij

import com.intellij.notification.NotificationGroupManager
import com.intellij.notification.NotificationType
import com.google.gson.JsonObject
import com.intellij.openapi.components.Service
import com.intellij.openapi.project.Project
import com.intellij.openapi.diagnostic.Logger
import org.gusqwen.intellij.acp.AcpConnection
import org.gusqwen.intellij.ide.IdeMcpServerService
import org.gusqwen.intellij.settings.GusQwenSettingsState
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.net.JarURLConnection
import java.net.URI
import java.net.URL
import java.util.Locale
import java.util.jar.JarFile
import java.util.concurrent.CompletableFuture
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.atomic.AtomicReference

@Service(Service.Level.PROJECT)
class AcpClientService(private val project: Project) {
  private val logger = Logger.getInstance(AcpClientService::class.java)
  private val listeners = CopyOnWriteArrayList<AcpUiListener>()
  private val pendingPermission = AtomicReference<CompletableFuture<String>?>()
  private var bundledCliPath: String? = null
  private var startupErrorNotified = false
  private val connection = AcpConnection(
    onAssistantChunk = { text -> notifyAssistant(text, false) },
    onThoughtChunk = { text -> notifyAssistant(text, true) },
    onAuthUpdate = { uri -> notifyAuth(uri) },
    onInitialized = { info -> notifyInitialized(info) },
    onStatus = { message -> notifyStatus(message) },
    onError = { error -> notifyError(error) },
    onSessionUpdate = { update -> notifySessionUpdate(update) },
    onPermissionRequest = { request -> handlePermissionRequest(request) },
    onEndTurn = { reason -> notifyEndTurn(reason) },
  )

  fun addListener(listener: AcpUiListener) {
    listeners.add(listener)
  }

  fun sendPrompt(text: String): String? {
    if (!ensureConnected()) {
      notifyError("CLI is not connected.")
      return null
    }
    ensureSession()
    return connection.sendPrompt(text)
  }

  fun createNewSession(): String? {
    if (!ensureConnected()) {
      notifyError("CLI is not connected.")
      return null
    }
    val cwd = project.basePath ?: System.getProperty("user.dir")
    return connection.newSession(cwd)
  }

  fun loadSession(sessionId: String, cwd: String? = null): Boolean {
    if (!ensureConnected()) {
      notifyError("CLI is not connected.")
      return false
    }
    val resolvedCwd = cwd ?: project.basePath ?: System.getProperty("user.dir")
    return connection.loadSession(sessionId, resolvedCwd)
  }

  fun listSessions(cursor: Int?, size: Int?): JsonObject? {
    if (!ensureConnected()) {
      notifyError("CLI is not connected.")
      return null
    }
    val cwd = project.basePath ?: System.getProperty("user.dir")
    return connection.listSessions(cwd, cursor, size)
  }

  fun cancelSession() {
    connection.cancelSession()
  }

  fun authenticate(methodId: String? = null) {
    ensureConnected()
    connection.authenticate(methodId)
  }

  fun setMode(modeId: String) {
    connection.setMode(modeId)
  }

  fun resolvePermission(optionId: String) {
    val future = pendingPermission.getAndSet(null)
    future?.complete(optionId)
  }

  fun getSessionId(): String? = connection.getSessionId()

  fun hasActiveSession(): Boolean = connection.hasActiveSession()

  fun isConnected(): Boolean = connection.isConnected()

  fun connectIfNeeded(): Boolean {
    return ensureConnected()
  }

  private fun ensureConnected(): Boolean {
    if (!connection.isConnected()) {
      val settings = GusQwenSettingsState.getInstance()
      val cliPath = resolveBundledCliPath()
      if (cliPath == null) {
        notifyError("Bundled CLI not found. Rebuild the plugin distribution.")
        notifyStartupError("Bundled CLI not found. Rebuild the plugin distribution.")
        return false
      }
      val resolvedNodePath = resolveNodePath(settings.nodePath)
      if (resolvedNodePath == null) {
        val message = "Node.js not found. Configure Node.js path in Settings | Gus Qwen."
        notifyError(message)
        notifyStartupError(message)
        return false
      }

      val cwd = project.basePath ?: System.getProperty("user.dir")
      val ideServer = project.getService(IdeMcpServerService::class.java)
      val envOverrides = mutableMapOf(
        "QWEN_CODE_IDE_SERVER_PORT" to ideServer.getPort().toString(),
        "QWEN_CODE_IDE_WORKSPACE_PATH" to ideServer.getWorkspacePath(),
        "QWEN_CODE_IDE_NAME" to "jetbrains",
        "QWEN_CODE_IDE_DISPLAY_NAME" to "JetBrains IDE",
      )
      val homeDir = System.getProperty("user.home").orEmpty()
      if (homeDir.isNotBlank()) {
        envOverrides["HOME"] = homeDir
      }
      val nodePath = Path.of(resolvedNodePath)
      if (nodePath.isAbsolute) {
        val nodeDir = nodePath.parent?.toString().orEmpty()
        if (nodeDir.isNotBlank()) {
          val currentPath = System.getenv("PATH").orEmpty()
          envOverrides["PATH"] = listOf(nodeDir, currentPath)
            .filter { it.isNotBlank() }
            .joinToString(File.pathSeparator)
        }
      }
      logger.info("ensureConnected: starting CLI at $cliPath (cwd=$cwd)")
      connection.connect(
        cliPath = cliPath,
        nodePath = resolvedNodePath,
        workingDir = cwd,
        envOverrides = envOverrides,
      )
    } else {
      logger.info("ensureConnected: already connected")
    }
    if (!connection.awaitInitialized()) {
      notifyError("CLI failed to initialize.")
      return false
    }
    return connection.isConnected()
  }

  private fun resolveNodePath(configuredPath: String): String? {
    val trimmed = configuredPath.trim()
    if (trimmed.isNotEmpty()) {
      val path = Path.of(trimmed)
      if (path.isAbsolute) {
        if (Files.isExecutable(path)) {
          return path.toString()
        }
        notifyStartupError("Configured Node.js path not found or not executable: $trimmed")
        return null
      }
      return trimmed
    }

    val osName = System.getProperty("os.name").lowercase(Locale.US)
    val nodeBinary = if (osName.contains("win")) "node.exe" else "node"
    val candidates = mutableListOf<Path>()
    val pathEnv = System.getenv("PATH").orEmpty()
    if (pathEnv.isNotBlank()) {
      pathEnv.split(File.pathSeparator).forEach { entry ->
        if (entry.isNotBlank()) {
          candidates.add(Path.of(entry, nodeBinary))
        }
      }
    }
    val known = when {
      osName.contains("mac") -> listOf(
        "/opt/homebrew/bin/node",
        "/usr/local/bin/node",
        "/usr/bin/node",
      )
      osName.contains("win") -> listOf(
        "C:\\Program Files\\nodejs\\node.exe",
        "C:\\Program Files (x86)\\nodejs\\node.exe",
      )
      else -> listOf(
        "/usr/local/bin/node",
        "/usr/bin/node",
      )
    }
    known.forEach { candidates.add(Path.of(it)) }

    return candidates.firstOrNull { Files.isExecutable(it) }?.toString()
  }

  private fun resolveBundledCliPath(): String? {
    bundledCliPath?.let { return it }
    val resourceUrl = javaClass.classLoader.getResource("cli/cli.js")
    if (resourceUrl != null) {
      when (resourceUrl.protocol) {
        "file" -> {
          val cliPath = Path.of(resourceUrl.toURI())
          logger.info("Using bundled CLI from resources: ${cliPath}")
          bundledCliPath = cliPath.toString()
          return bundledCliPath
        }
        "jar" -> {
          val extractedDir = extractBundledCliFromJar(resourceUrl)
          if (extractedDir != null) {
            val cliPath = extractedDir.resolve("cli.js")
            logger.info("Using bundled CLI from jar: ${cliPath}")
            bundledCliPath = cliPath.toString()
            return bundledCliPath
          }
        }
      }
    }

    val roots = mutableListOf<Path>()
    project.basePath?.let { roots.add(Path.of(it)) }
    val userDir = System.getProperty("user.dir")
    if (!userDir.isNullOrBlank()) {
      roots.add(Path.of(userDir))
    }
    val codeSource = runCatching {
      javaClass.protectionDomain.codeSource.location.toURI()
    }.getOrNull()
    if (codeSource != null) {
      roots.add(Path.of(codeSource))
    }

    logger.info(
      "Bundled CLI resource missing; probing roots: " +
        roots.joinToString(", ") { it.toString() },
    )
    for (root in roots) {
      val candidate = findCliCandidate(root)
      if (candidate != null) {
        logger.info("Using CLI fallback at: ${candidate}")
        bundledCliPath = candidate.toString()
        return bundledCliPath
      }
    }
    logger.warn("CLI fallback paths not found.")

    return null
  }

  private fun extractBundledCliFromJar(resourceUrl: URL): Path? {
    val jarConnection = runCatching { resourceUrl.openConnection() }.getOrNull()
    val jarFile = if (jarConnection is JarURLConnection) {
      jarConnection.jarFile
    } else {
      val spec = resourceUrl.toString()
      val separator = spec.indexOf("!/")
      if (!spec.startsWith("jar:") || separator == -1) {
        return null
      }
      val jarPath = spec.substring(4, separator)
      JarFile(Path.of(URI.create(jarPath)).toFile())
    }

    val tempDir = Files.createTempDirectory("gusqwen-cli-")
    tempDir.toFile().deleteOnExit()
    jarFile.use { jar ->
      val entries = jar.entries()
      while (entries.hasMoreElements()) {
        val entry = entries.nextElement()
        val name = entry.name
        if (!name.startsWith("cli/") || entry.isDirectory) continue
        val relative = name.removePrefix("cli/")
        val target = tempDir.resolve(relative)
        Files.createDirectories(target.parent)
        jar.getInputStream(entry).use { input ->
          Files.newOutputStream(target).use { output ->
            input.copyTo(output)
          }
        }
      }
    }
    return tempDir
  }

  private fun findCliCandidate(root: Path): Path? {
    var current: Path? = root
    var steps = 0
    while (current != null && steps < 8) {
      val dirCandidate = current.resolve(
        Path.of(
          "packages",
          "vscode-ide-companion",
          "dist",
          "gusqwen-cli",
        ),
      )
      val cliCandidate = dirCandidate.resolve("cli.js")
      if (Files.exists(cliCandidate)) {
        return cliCandidate
      }
      current = current.parent
      steps += 1
    }
    return null
  }

  private fun ensureSession() {
    if (connection.hasActiveSession()) return
    val cwd = project.basePath ?: System.getProperty("user.dir")
    connection.newSession(cwd)
  }

  private fun notifyAssistant(text: String, isThought: Boolean) {
    listeners.forEach { it.onAssistantChunk(text, isThought) }
  }

  private fun notifyInitialized(info: JsonObject) {
    listeners.forEach { it.onInitialized(info) }
  }

  private fun notifyAuth(uri: String) {
    listeners.forEach { it.onAuthUpdate(uri) }
    NotificationGroupManager.getInstance()
      .getNotificationGroup("GusQwen")
      .createNotification(
        "Authentication required",
        uri,
        NotificationType.INFORMATION,
      )
      .notify(project)
  }

  private fun notifyError(message: String) {
    listeners.forEach { it.onError(message) }
    val lower = message.lowercase(Locale.US)
    if (
      lower.contains("failed to start cli") ||
      lower.contains("bundled cli not found") ||
      lower.contains("node.js not found")
    ) {
      notifyStartupError(message)
    }
  }

  private fun notifyStatus(message: String) {
    listeners.forEach { it.onStatus(message) }
  }

  private fun notifySessionUpdate(update: JsonObject) {
    listeners.forEach { it.onSessionUpdate(update) }
  }

  private fun notifyEndTurn(reason: String?) {
    if (reason != null) {
      notifyStatus("Stop reason: $reason")
    }
    listeners.forEach { it.onEndTurn(reason) }
  }

  private fun notifyStartupError(message: String) {
    if (startupErrorNotified) return
    startupErrorNotified = true
    NotificationGroupManager.getInstance()
      .getNotificationGroup("GusQwen")
      .createNotification(
        "Gus Qwen",
        message,
        NotificationType.ERROR,
      )
      .notify(project)
  }

  private fun handlePermissionRequest(request: JsonObject): String {
    val future = CompletableFuture<String>()
    pendingPermission.set(future)
    listeners.forEach { it.onPermissionRequest(request) }
    return try {
      future.get()
    } catch (e: Exception) {
      "allow_once"
    }
  }
}

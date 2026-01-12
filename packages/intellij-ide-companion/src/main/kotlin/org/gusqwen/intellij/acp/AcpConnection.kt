package org.gusqwen.intellij.acp

import com.google.gson.Gson
import com.google.gson.JsonObject
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.File
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.CompletableFuture
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger

class AcpConnection(
  private val onAssistantChunk: (String) -> Unit,
  private val onThoughtChunk: (String) -> Unit,
  private val onAuthUpdate: (String) -> Unit,
  private val onInitialized: (JsonObject) -> Unit,
  private val onStatus: (String) -> Unit,
  private val onError: (String) -> Unit,
  private val onSessionUpdate: (JsonObject) -> Unit,
  private val onPermissionRequest: (JsonObject) -> String,
  private val onEndTurn: (String?) -> Unit,
) {
  private val gson = Gson()
  private val nextId = AtomicInteger(1)
  private val pending = ConcurrentHashMap<Int, CompletableFuture<JsonObject>>()
  private val executor = Executors.newCachedThreadPool()
  private var process: Process? = null
  private var writer: BufferedWriter? = null
  private var sessionId: String? = null
  private val initFuture = CompletableFuture<Boolean>()
  @Volatile private var initialized = false

  fun connect(
    cliPath: String,
    nodePath: String?,
    workingDir: String,
    envOverrides: Map<String, String> = emptyMap(),
  ) {
    if (process != null) return

    val command = ArrayList<String>()
    command.add(nodePath?.ifEmpty { "node" } ?: "node")
    command.add(cliPath)
    command.add("--experimental-acp")
    command.add("--channel=JetBrains")

    val builder = ProcessBuilder(command)
    builder.directory(File(workingDir))
    builder.redirectErrorStream(false)
    if (envOverrides.isNotEmpty()) {
      val env = builder.environment()
      envOverrides.forEach { (key, value) -> env[key] = value }
    }

    try {
      process = builder.start()
    } catch (e: Exception) {
      onError("Failed to start CLI: ${e.message}")
      return
    }

    onStatus("CLI started: ${command.joinToString(" ")}")

    writer = BufferedWriter(OutputStreamWriter(process!!.outputStream, StandardCharsets.UTF_8))

    startStdoutReader(process!!)
    startStderrReader(process!!)

    val initOk = initialize()
    initialized = initOk
    if (!initFuture.isDone) {
      initFuture.complete(initOk)
    }
  }

  fun isConnected(): Boolean = process != null && process?.isAlive == true

  fun hasActiveSession(): Boolean = sessionId != null

  fun getSessionId(): String? = sessionId

  fun isInitialized(): Boolean = initialized

  fun awaitInitialized(timeoutMs: Long = 10000): Boolean {
    if (initialized) return true
    return try {
      initFuture.get(timeoutMs, TimeUnit.MILLISECONDS)
    } catch (_: Exception) {
      false
    }
  }

  fun newSession(cwd: String): String? {
    val params = JsonObject().apply {
      addProperty("cwd", cwd)
      add("mcpServers", gson.toJsonTree(emptyList<Any>()))
    }

    val response = sendRequest(AcpProtocol.AgentMethods.SESSION_NEW, params)
    if (response == null) {
      onError("Failed to create session.")
      return null
    }
    if (response.has("error")) {
      val err = response.getAsJsonObject("error")
      val message = err?.get("message")?.asString ?: "Failed to create session."
      onError(message)
      return null
    }
    val result = response.getAsJsonObject("result")
    sessionId = result?.get("sessionId")?.asString
    onStatus("Session created: ${sessionId ?: "unknown"}")
    return sessionId
  }

  fun loadSession(sessionId: String, cwd: String): Boolean {
    val params = JsonObject().apply {
      addProperty("sessionId", sessionId)
      addProperty("cwd", cwd)
      add("mcpServers", gson.toJsonTree(emptyList<Any>()))
    }

    val response = sendRequest(AcpProtocol.AgentMethods.SESSION_LOAD, params)
    if (response == null) {
      onError("Failed to load session.")
      return false
    }
    if (response.has("error")) {
      val err = response.getAsJsonObject("error")
      val message = err?.get("message")?.asString ?: "Failed to load session."
      onError(message)
      return false
    }
    this.sessionId = sessionId
    onStatus("Session loaded: $sessionId")
    return true
  }

  fun listSessions(cwd: String, cursor: Int?, size: Int?): JsonObject? {
    val params = JsonObject().apply {
      addProperty("cwd", cwd)
      if (cursor != null) {
        addProperty("cursor", cursor)
      }
      if (size != null) {
        addProperty("size", size)
      }
    }

    val response = sendRequest(AcpProtocol.AgentMethods.SESSION_LIST, params)
    if (response == null) {
      onError("Failed to list sessions.")
      return null
    }
    if (response.has("error")) {
      val err = response.getAsJsonObject("error")
      val message = err?.get("message")?.asString ?: "Failed to list sessions."
      onError(message)
      return null
    }
    return response.getAsJsonObject("result")
  }

  fun sendPrompt(prompt: String): String? {
    val activeSession = sessionId
    if (activeSession == null) {
      onError("No active session. Create a session first.")
      return null
    }

    val textBlock = JsonObject().apply {
      addProperty("type", "text")
      addProperty("text", prompt)
    }
    val params = JsonObject().apply {
      addProperty("sessionId", activeSession)
      add("prompt", gson.toJsonTree(listOf(textBlock)))
    }

    val response = sendRequest(AcpProtocol.AgentMethods.SESSION_PROMPT, params)
    if (response == null) {
      onError("Prompt failed.")
      return null
    }
    if (response.has("error")) {
      val err = response.getAsJsonObject("error")
      val message = err?.get("message")?.asString ?: "Prompt failed."
      onError(message)
      return null
    }
    val result = response.getAsJsonObject("result")
    val stopReason = result?.get("stopReason")?.asString
      ?: result?.get("stop_reason")?.asString
    onEndTurn(stopReason)
    return stopReason
  }

  private fun initialize(): Boolean {
    val params = JsonObject().apply {
      addProperty("protocolVersion", 1)
      add("clientCapabilities", JsonObject().apply {
        add("fs", JsonObject().apply {
          addProperty("readTextFile", true)
          addProperty("writeTextFile", true)
        })
      })
    }

    val response = sendRequest(AcpProtocol.AgentMethods.INITIALIZE, params)
    if (response == null) {
      onError("Failed to initialize ACP session.")
      return false
    }
    if (response.has("error")) {
      val err = response.getAsJsonObject("error")
      val message = err?.get("message")?.asString ?: "Failed to initialize ACP session."
      onError(message)
      return false
    }
    val result = response.getAsJsonObject("result")
    if (result != null) {
      onInitialized(result)
    }
    onStatus("Connected")
    return true
  }

  fun authenticate(methodId: String? = null) {
    val params = JsonObject().apply {
      if (!methodId.isNullOrEmpty()) {
        addProperty("methodId", methodId)
      }
    }
    sendRequest(AcpProtocol.AgentMethods.AUTHENTICATE, params)
  }

  fun setMode(modeId: String) {
    val activeSession = sessionId ?: return
    val params = JsonObject().apply {
      addProperty("sessionId", activeSession)
      addProperty("modeId", modeId)
    }
    sendRequest(AcpProtocol.AgentMethods.SESSION_SET_MODE, params)
  }

  fun cancelSession() {
    val activeSession = sessionId ?: return
    val params = JsonObject().apply {
      addProperty("sessionId", activeSession)
    }
    sendRequest(AcpProtocol.AgentMethods.SESSION_CANCEL, params)
  }

  private fun sendRequest(method: String, params: JsonObject?): JsonObject? {
    val id = nextId.getAndIncrement()
    val request = JsonObject().apply {
      addProperty("jsonrpc", AcpProtocol.JSONRPC_VERSION)
      addProperty("id", id)
      addProperty("method", method)
      if (params != null) {
        add("params", params)
      }
    }

    val future = CompletableFuture<JsonObject>()
    pending[id] = future
    sendMessage(request)

    return try {
      future.get()
    } catch (e: Exception) {
      onError("Request failed: ${e.message}")
      null
    } finally {
      pending.remove(id)
    }
  }

  private fun sendMessage(message: JsonObject) {
    try {
      val line = gson.toJson(message) + "\n"
      writer?.write(line)
      writer?.flush()
    } catch (e: Exception) {
      onError("Failed to send message: ${e.message}")
    }
  }

  private fun startStdoutReader(proc: Process) {
    executor.execute {
      BufferedReader(InputStreamReader(proc.inputStream, StandardCharsets.UTF_8)).use { reader ->
        var line: String?
        while (reader.readLine().also { line = it } != null) {
          val raw = line?.trim().orEmpty()
          if (raw.isEmpty()) continue
          try {
            val json = gson.fromJson(raw, JsonObject::class.java)
            handleMessage(json)
          } catch (e: Exception) {
            onStatus("Non-JSON output: ${raw.take(200)}")
          }
        }
      }
    }
  }

  private fun startStderrReader(proc: Process) {
    executor.execute {
      BufferedReader(InputStreamReader(proc.errorStream, StandardCharsets.UTF_8)).use { reader ->
        var line: String?
        while (reader.readLine().also { line = it } != null) {
          val msg = line?.trim().orEmpty()
          if (msg.isNotEmpty()) {
            onStatus(msg)
          }
        }
      }
    }
  }

  private fun handleMessage(message: JsonObject) {
    if (message.has("method")) {
      handleRequestOrNotification(message)
    } else if (message.has("id")) {
      val id = message.get("id").asInt
      val future = pending[id]
      if (future != null) {
        future.complete(message)
      }
    }
  }

  private fun handleRequestOrNotification(message: JsonObject) {
    val method = message.get("method")?.asString ?: return
    val params = message.getAsJsonObject("params")
    val id = message.get("id")?.asInt

    when (method) {
      AcpProtocol.ClientMethods.SESSION_UPDATE -> {
        handleSessionUpdate(params)
      }
      AcpProtocol.ClientMethods.AUTHENTICATE_UPDATE -> {
        val meta = params?.getAsJsonObject("_meta")
        val uri = meta?.get("authUri")?.asString
        if (!uri.isNullOrEmpty()) {
          onAuthUpdate(uri)
        }
      }
      AcpProtocol.ClientMethods.SESSION_REQUEST_PERMISSION -> {
        if (id != null) {
          val optionId = try {
            if (params != null) {
              onPermissionRequest(params)
            } else {
              "allow_once"
            }
          } catch (e: Exception) {
            "allow_once"
          }
          val result = JsonObject().apply {
            add("outcome", JsonObject().apply {
              addProperty("outcome", "selected")
              addProperty("optionId", optionId)
            })
          }
          sendResponse(id, result)
        }
      }
      AcpProtocol.ClientMethods.FS_READ_TEXT_FILE -> {
        if (id != null) {
          val path = params?.get("path")?.asString.orEmpty()
          sendResponse(id, handleReadTextFile(path))
        }
      }
      AcpProtocol.ClientMethods.FS_WRITE_TEXT_FILE -> {
        if (id != null) {
          val path = params?.get("path")?.asString.orEmpty()
          val content = params?.get("content")?.asString.orEmpty()
          sendResponse(id, handleWriteTextFile(path, content))
        }
      }
    }
  }

  private fun handleSessionUpdate(params: JsonObject?) {
    val update = params?.getAsJsonObject("update") ?: return
    onSessionUpdate(params)
    val type = update.get("sessionUpdate")?.asString ?: return
    val content = update.getAsJsonObject("content")
    val text = content?.get("text")?.asString

    when (type) {
      "agent_message_chunk" -> {
        if (!text.isNullOrEmpty()) onAssistantChunk(text)
      }
      "agent_thought_chunk" -> {
        if (!text.isNullOrEmpty()) onThoughtChunk(text)
      }
    }
  }

  private fun handleReadTextFile(path: String): JsonObject {
    return try {
      val content = Files.readString(Path.of(path))
      JsonObject().apply {
        addProperty("content", content)
      }
    } catch (e: Exception) {
      val errorContent = when (e) {
        is java.nio.file.NoSuchFileException -> "ERROR: ENOENT: $path"
        else -> "ERROR: ${e.message ?: "Failed to read file"}"
      }
      JsonObject().apply {
        addProperty("content", errorContent)
      }
    }
  }

  private fun handleWriteTextFile(path: String, content: String): JsonObject {
    return try {
      Files.writeString(Path.of(path), content)
      JsonObject().apply {
        addProperty("ok", true)
      }
    } catch (e: Exception) {
      JsonObject().apply {
        addProperty("error", e.message ?: "Failed to write file")
      }
    }
  }

  private fun sendResponse(id: Int, result: JsonObject) {
    val response = JsonObject().apply {
      addProperty("jsonrpc", AcpProtocol.JSONRPC_VERSION)
      addProperty("id", id)
      add("result", result)
    }
    sendMessage(response)
  }
}

package org.gusqwen.intellij.ide

import com.intellij.diff.DiffContentFactory
import com.intellij.diff.DiffManager
import com.intellij.diff.requests.SimpleDiffRequest
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.editor.Document
import com.intellij.openapi.editor.EditorFactory
import com.intellij.openapi.fileTypes.FileTypeRegistry
import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.DialogWrapper
import com.intellij.openapi.util.Disposer
import com.intellij.openapi.vfs.LocalFileSystem
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.ConcurrentHashMap
import javax.swing.Action
import javax.swing.JComponent

class IdeDiffManager(
  private val project: Project,
  private val onAccepted: (filePath: String, content: String) -> Unit,
  private val onRejected: (filePath: String) -> Unit,
  private val onClosed: (filePath: String, content: String?) -> Unit,
) {
  private val sessions = ConcurrentHashMap<String, DiffSession>()

  fun showDiff(filePath: String, newContent: String) {
    ApplicationManager.getApplication().invokeLater {
      val normalizedPath = Path.of(filePath).normalize().toString()
      val existing = sessions[normalizedPath]
      if (existing != null) {
        existing.dialog.show()
        return@invokeLater
      }

      val oldContent = readOldContent(normalizedPath)
      val document = EditorFactory.getInstance().createDocument(newContent)
      val request = buildDiffRequest(normalizedPath, oldContent, document)
      val dialog = DiffDialog(project, request) { outcome ->
        sessions.remove(normalizedPath)
        when (outcome) {
          DiffOutcome.Accepted -> onAccepted(normalizedPath, document.text)
          DiffOutcome.Rejected -> onRejected(normalizedPath)
        }
      }
      sessions[normalizedPath] = DiffSession(dialog, document)
      dialog.show()
    }
  }

  fun closeDiff(filePath: String, suppressNotification: Boolean): String? {
    val normalizedPath = Path.of(filePath).normalize().toString()
    val session = sessions.remove(normalizedPath) ?: return null
    val content = session.document.text
    ApplicationManager.getApplication().invokeLater {
      session.dialog.closeSilently(DialogWrapper.CANCEL_EXIT_CODE)
      if (!suppressNotification) {
        onClosed(normalizedPath, content)
      }
    }
    return content
  }

  private fun buildDiffRequest(filePath: String, oldContent: String, document: Document): SimpleDiffRequest {
    val contentFactory = DiffContentFactory.getInstance()
    val fileType = FileTypeRegistry.getInstance().getFileTypeByFileName(filePath)
    val oldDiff = contentFactory.create(project, oldContent, fileType)
    val newDiff = contentFactory.create(project, document, fileType)
    val title = Path.of(filePath).fileName.toString()
    return SimpleDiffRequest(title, oldDiff, newDiff, "Original", "Proposed")
  }

  private fun readOldContent(filePath: String): String {
    val virtualFile = LocalFileSystem.getInstance().findFileByPath(filePath)
    if (virtualFile != null && virtualFile.exists()) {
      return runCatching { String(virtualFile.contentsToByteArray()) }.getOrDefault("")
    }
    return runCatching { Files.readString(Path.of(filePath)) }.getOrDefault("")
  }

  private data class DiffSession(
    val dialog: DiffDialog,
    val document: Document,
  )

  private enum class DiffOutcome {
    Accepted,
    Rejected,
  }

  private class DiffDialog(
    project: Project,
    private val request: SimpleDiffRequest,
    private val onFinish: (DiffOutcome) -> Unit,
  ) : DialogWrapper(project, true) {
    private val panelDisposable = Disposer.newDisposable("GusQwenDiffPanel")
    private val panel = DiffManager.getInstance().createRequestPanel(project, panelDisposable, null)
    private var suppressOutcome = false

    init {
      title = "Proposed Changes"
      setResizable(true)
      panel.setRequest(request)
      init()
    }

    override fun createCenterPanel(): JComponent = panel.component

    override fun getPreferredFocusedComponent(): JComponent? = panel.component

    override fun createActions(): Array<Action> {
      val okAction = okAction
      okAction.putValue(Action.NAME, "Accept")
      val cancelAction = cancelAction
      cancelAction.putValue(Action.NAME, "Reject")
      return arrayOf(okAction, cancelAction)
    }

    override fun doOKAction() {
      super.doOKAction()
      if (!suppressOutcome) {
        onFinish(DiffOutcome.Accepted)
      }
    }

    override fun doCancelAction() {
      super.doCancelAction()
      if (!suppressOutcome) {
        onFinish(DiffOutcome.Rejected)
      }
    }

    override fun dispose() {
      Disposer.dispose(panelDisposable)
      super.dispose()
    }

    fun closeSilently(exitCode: Int) {
      suppressOutcome = true
      super.close(exitCode)
    }
  }
}

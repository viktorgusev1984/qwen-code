package org.gusqwen.intellij.ide

import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.intellij.openapi.Disposable
import com.intellij.openapi.editor.Editor
import com.intellij.openapi.editor.EditorFactory
import com.intellij.openapi.editor.event.CaretEvent
import com.intellij.openapi.editor.event.CaretListener
import com.intellij.openapi.editor.event.SelectionEvent
import com.intellij.openapi.editor.event.SelectionListener
import com.intellij.openapi.fileEditor.FileDocumentManager
import com.intellij.openapi.fileEditor.FileEditorManager
import com.intellij.openapi.fileEditor.FileEditorManagerEvent
import com.intellij.openapi.fileEditor.FileEditorManagerListener
import com.intellij.openapi.fileEditor.TextEditor
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import java.util.concurrent.CopyOnWriteArrayList
import kotlin.math.min

class IdeOpenFilesManager(
  private val project: Project,
  private val parentDisposable: Disposable,
) {
  private val listeners = CopyOnWriteArrayList<() -> Unit>()
  private val openFiles = ArrayList<FileEntry>()

  init {
    subscribeListeners()
    syncOpenFiles()
    addActiveEditor()
  }

  fun addListener(listener: () -> Unit) {
    listeners.add(listener)
  }

  fun removeListener(listener: () -> Unit) {
    listeners.remove(listener)
  }

  fun toJson(): JsonObject {
    val files = JsonArray()
    for (entry in openFiles) {
      val obj = JsonObject().apply {
        addProperty("path", entry.path)
        addProperty("timestamp", entry.timestamp)
        if (entry.isActive) addProperty("isActive", true)
        if (entry.cursor != null) {
          add(
            "cursor",
            JsonObject().apply {
              addProperty("line", entry.cursor!!.line)
              addProperty("character", entry.cursor!!.character)
            },
          )
        }
        if (entry.selectedText != null) {
          addProperty("selectedText", entry.selectedText)
        }
      }
      files.add(obj)
    }

    return JsonObject().apply {
      add(
        "workspaceState",
        JsonObject().apply {
          add("openFiles", files)
        },
      )
    }
  }

  private fun notifyChanged() {
    listeners.forEach { it.invoke() }
  }

  private fun subscribeListeners() {
    val bus = project.messageBus.connect(parentDisposable)
    bus.subscribe(
      FileEditorManagerListener.FILE_EDITOR_MANAGER,
      object : FileEditorManagerListener {
        override fun fileOpened(source: FileEditorManager, file: VirtualFile) {
          addFileIfMissing(file.path)
          notifyChanged()
        }

        override fun selectionChanged(event: FileEditorManagerEvent) {
          val editor = (event.newEditor as? TextEditor)?.editor
            ?: FileEditorManager.getInstance(project).selectedTextEditor
          updateActiveEditor(editor)
        }

        override fun fileClosed(source: FileEditorManager, file: VirtualFile) {
          removeFile(file.path)
          notifyChanged()
        }
      },
    )

    val caretListener = object : CaretListener {
      override fun caretPositionChanged(event: CaretEvent) {
        updateActiveEditor(event.editor)
      }
    }
    EditorFactory.getInstance().eventMulticaster.addCaretListener(caretListener, parentDisposable)

    val selectionListener = object : SelectionListener {
      override fun selectionChanged(event: SelectionEvent) {
        updateActiveEditor(event.editor)
      }
    }
    EditorFactory.getInstance().eventMulticaster.addSelectionListener(selectionListener, parentDisposable)
  }

  private fun addActiveEditor() {
    val editor = FileEditorManager.getInstance(project).selectedTextEditor
    updateActiveEditor(editor)
  }

  private fun syncOpenFiles() {
    val editorManager = FileEditorManager.getInstance(project)
    editorManager.openFiles.forEach { file ->
      addFileIfMissing(file.path)
    }
  }

  private fun updateActiveEditor(editor: Editor?) {
    val app = com.intellij.openapi.application.ApplicationManager.getApplication()
    if (!app.isDispatchThread && !app.isReadAccessAllowed) {
      app.runReadAction { updateActiveEditor(editor) }
      return
    }

    val document = editor?.document
    val file = document?.let { FileDocumentManager.getInstance().getFile(it) }
    if (file == null) {
      clearActiveFlags()
      notifyChanged()
      return
    }

    moveToFront(file.path)
    val active = openFiles.firstOrNull() ?: return
    active.isActive = true
    active.timestamp = System.currentTimeMillis()

    if (editor != null) {
      val caret = editor.caretModel.logicalPosition
      active.cursor = Cursor(caret.line + 1, caret.column + 1)
      val selectionText = editor.selectionModel.selectedText
      active.selectedText = truncateSelection(selectionText)
    }

    notifyChanged()
  }

  private fun moveToFront(path: String) {
    clearActiveFlags()
    val existingIndex = openFiles.indexOfFirst { it.path == path }
    if (existingIndex != -1) {
      openFiles.removeAt(existingIndex)
    }
    openFiles.add(
      0,
      FileEntry(
        path = path,
        timestamp = System.currentTimeMillis(),
        isActive = true,
        cursor = null,
        selectedText = null,
      ),
    )
    if (openFiles.size > MAX_FILES) {
      openFiles.subList(MAX_FILES, openFiles.size).clear()
    }
  }

  private fun addFileIfMissing(path: String) {
    val existingIndex = openFiles.indexOfFirst { it.path == path }
    if (existingIndex != -1) {
      return
    }
    openFiles.add(
      FileEntry(
        path = path,
        timestamp = System.currentTimeMillis(),
        isActive = false,
        cursor = null,
        selectedText = null,
      ),
    )
    if (openFiles.size > MAX_FILES) {
      openFiles.subList(MAX_FILES, openFiles.size).clear()
    }
  }

  private fun clearActiveFlags() {
    openFiles.forEach {
      it.isActive = false
      it.cursor = null
      it.selectedText = null
    }
  }

  private fun removeFile(path: String) {
    val idx = openFiles.indexOfFirst { it.path == path }
    if (idx != -1) {
      openFiles.removeAt(idx)
    }
  }

  private fun truncateSelection(selection: String?): String? {
    if (selection.isNullOrEmpty()) {
      return null
    }
    if (selection.length <= MAX_SELECTED_TEXT_LENGTH) {
      return selection
    }
    val truncated = selection.substring(0, min(selection.length, MAX_SELECTED_TEXT_LENGTH))
    return "$truncated... [TRUNCATED]"
  }

  private data class Cursor(val line: Int, val character: Int)

  private data class FileEntry(
    val path: String,
    var timestamp: Long,
    var isActive: Boolean,
    var cursor: Cursor?,
    var selectedText: String?,
  )

  private companion object {
    private const val MAX_FILES = 10
    private const val MAX_SELECTED_TEXT_LENGTH = 16_384
  }
}

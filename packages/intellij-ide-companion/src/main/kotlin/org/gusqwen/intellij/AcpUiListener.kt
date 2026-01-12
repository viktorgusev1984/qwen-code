package org.gusqwen.intellij

import com.google.gson.JsonObject

interface AcpUiListener {
  fun onAssistantChunk(text: String, isThought: Boolean)
  fun onEndTurn(reason: String?)
  fun onInitialized(info: JsonObject)
  fun onAuthUpdate(uri: String)
  fun onError(message: String)
  fun onStatus(message: String)
  fun onSessionUpdate(update: JsonObject)
  fun onPermissionRequest(request: JsonObject)
}

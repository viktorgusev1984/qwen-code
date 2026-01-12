package org.gusqwen.intellij.acp

object AcpProtocol {
  const val JSONRPC_VERSION = "2.0"

  object AgentMethods {
    const val INITIALIZE = "initialize"
    const val AUTHENTICATE = "authenticate"
    const val SESSION_NEW = "session/new"
    const val SESSION_PROMPT = "session/prompt"
    const val SESSION_LIST = "session/list"
    const val SESSION_LOAD = "session/load"
    const val SESSION_CANCEL = "session/cancel"
    const val SESSION_SET_MODE = "session/set_mode"
  }

  object ClientMethods {
    const val SESSION_UPDATE = "session/update"
    const val AUTHENTICATE_UPDATE = "authenticate/update"
    const val SESSION_REQUEST_PERMISSION = "session/request_permission"
    const val FS_READ_TEXT_FILE = "fs/read_text_file"
    const val FS_WRITE_TEXT_FILE = "fs/write_text_file"
  }
}

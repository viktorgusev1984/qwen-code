/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const SERVICE_NAME = 'gusqwen';

export const EVENT_USER_PROMPT = 'gusqwen.user_prompt';
export const EVENT_TOOL_CALL = 'gusqwen.tool_call';
export const EVENT_API_REQUEST = 'gusqwen.api_request';
export const EVENT_API_ERROR = 'gusqwen.api_error';
export const EVENT_API_CANCEL = 'gusqwen.api_cancel';
export const EVENT_API_RESPONSE = 'gusqwen.api_response';
export const EVENT_CLI_CONFIG = 'gusqwen.config';
export const EVENT_EXTENSION_DISABLE = 'gusqwen.extension_disable';
export const EVENT_EXTENSION_ENABLE = 'gusqwen.extension_enable';
export const EVENT_EXTENSION_INSTALL = 'gusqwen.extension_install';
export const EVENT_EXTENSION_UNINSTALL = 'gusqwen.extension_uninstall';
export const EVENT_FLASH_FALLBACK = 'gusqwen.flash_fallback';
export const EVENT_RIPGREP_FALLBACK = 'gusqwen.ripgrep_fallback';
export const EVENT_NEXT_SPEAKER_CHECK = 'gusqwen.next_speaker_check';
export const EVENT_SLASH_COMMAND = 'gusqwen.slash_command';
export const EVENT_IDE_CONNECTION = 'gusqwen.ide_connection';
export const EVENT_CHAT_COMPRESSION = 'gusqwen.chat_compression';
export const EVENT_INVALID_CHUNK = 'gusqwen.chat.invalid_chunk';
export const EVENT_CONTENT_RETRY = 'gusqwen.chat.content_retry';
export const EVENT_CONTENT_RETRY_FAILURE =
  'gusqwen.chat.content_retry_failure';
export const EVENT_CONVERSATION_FINISHED = 'gusqwen.conversation_finished';
export const EVENT_MALFORMED_JSON_RESPONSE =
  'gusqwen.malformed_json_response';
export const EVENT_FILE_OPERATION = 'gusqwen.file_operation';
export const EVENT_MODEL_SLASH_COMMAND = 'gusqwen.slash_command.model';
export const EVENT_SUBAGENT_EXECUTION = 'gusqwen.subagent_execution';
export const EVENT_AUTH = 'gusqwen.auth';

// Performance Events
export const EVENT_STARTUP_PERFORMANCE = 'gusqwen.startup.performance';
export const EVENT_MEMORY_USAGE = 'gusqwen.memory.usage';
export const EVENT_PERFORMANCE_BASELINE = 'gusqwen.performance.baseline';
export const EVENT_PERFORMANCE_REGRESSION = 'gusqwen.performance.regression';

/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { useVSCode } from './hooks/useVSCode.js';
import { useSessionManagement } from './hooks/session/useSessionManagement.js';
import { useFileContext } from './hooks/file/useFileContext.js';
import { useMessageHandling } from './hooks/message/useMessageHandling.js';
import { useToolCalls } from './hooks/useToolCalls.js';
import { useWebViewMessages } from './hooks/useWebViewMessages.js';
import { useMessageSubmit } from './hooks/useMessageSubmit.js';
import type {
  PermissionOption,
  ToolCall as PermissionToolCall,
} from './components/PermissionDrawer/PermissionRequest.js';
import type { TextMessage } from './hooks/message/useMessageHandling.js';
import type { ToolCallData } from './components/messages/toolcalls/ToolCall.js';
import { PermissionDrawer } from './components/PermissionDrawer/PermissionDrawer.js';
import { ToolCall } from './components/messages/toolcalls/ToolCall.js';
import { hasToolCallOutput } from './components/messages/toolcalls/shared/utils.js';
import { EmptyState } from './components/layout/EmptyState.js';
import { Onboarding } from './components/layout/Onboarding.js';
import { type CompletionItem } from '../types/completionItemTypes.js';
import { useCompletionTrigger } from './hooks/useCompletionTrigger.js';
import { ChatHeader } from './components/layout/ChatHeader.js';
import {
  UserMessage,
  AssistantMessage,
  ThinkingMessage,
  WaitingMessage,
  InterruptedMessage,
} from './components/messages/index.js';
import { InputForm } from './components/layout/InputForm.js';
import { SessionSelector } from './components/layout/SessionSelector.js';
import { FileIcon, FolderIcon, UserIcon } from './components/icons/index.js';
import { ApprovalMode, NEXT_APPROVAL_MODE } from '../types/acpTypes.js';
import type { ApprovalModeValue } from '../types/approvalModeValueTypes.js';
import type { PlanEntry } from '../types/chatTypes.js';

export const App: React.FC = () => {
  const vscode = useVSCode();

  // Core hooks
  const sessionManagement = useSessionManagement(vscode);
  const fileContext = useFileContext(vscode);
  const messageHandling = useMessageHandling();
  const {
    inProgressToolCalls,
    completedToolCalls,
    handleToolCallUpdate,
    clearToolCalls,
  } = useToolCalls();

  // UI state
  const [inputText, setInputText] = useState('');
  const [permissionRequest, setPermissionRequest] = useState<{
    options: PermissionOption[];
    toolCall: PermissionToolCall;
  } | null>(null);
  const [confirmActionRequest, setConfirmActionRequest] = useState<{
    prompt: string;
    raw: string;
  } | null>(null);
  const [planEntries, setPlanEntries] = useState<PlanEntry[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track if we're still initializing/loading
  const [availableCommands, setAvailableCommands] = useState<
    Array<Record<string, unknown>>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  // Scroll container for message list; used to keep the view anchored to the latest content
  const messagesContainerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  const inputFieldRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [editMode, setEditMode] = useState<ApprovalModeValue>(
    ApprovalMode.DEFAULT,
  );
  const [thinkingEnabled, setThinkingEnabled] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  // When true, do NOT auto-attach the active editor file/selection to message context
  const [skipAutoActiveContext, setSkipAutoActiveContext] = useState(false);

  // Completion system
  const normalizeFileQuery = React.useCallback(
    (raw: string) =>
      raw.trim().replace(/^@/, '').replace(/\\/g, '/').toLowerCase(),
    [],
  );

  const normalizeMatchText = React.useCallback(
    (raw: string) => raw.replace(/\\/g, '/').toLowerCase(),
    [],
  );

  const getCompletionItems = React.useCallback(
    async (trigger: '@' | '/', query: string): Promise<CompletionItem[]> => {
      if (trigger === '@') {
        console.log('[App] getCompletionItems @ called', {
          query,
          requested: fileContext.hasRequestedFiles,
          workspaceFiles: fileContext.workspaceFiles.length,
        });
        // 始终根据当前 query 触发请求，让 hook 判断是否需要真正请求
        fileContext.requestWorkspaceFiles(query);

        const fileIcon = <FileIcon />;
        const folderIcon = <FolderIcon />;
        const allItems: CompletionItem[] = fileContext.workspaceFiles.map(
          (file) => {
            const isFolder = file.type === 'folder';
            const displayPath = file.description ?? file.label;
            return {
              id: file.id,
              label: displayPath,
              description: file.description ? file.label : undefined,
              type: isFolder ? ('folder' as const) : ('file' as const),
              icon: isFolder ? folderIcon : fileIcon,
              // Insert the same path shown in the dropdown (relative path if available).
              value: displayPath,
              path: file.path,
            };
          },
        );

        if (query && query.length >= 1) {
          const normalizedQuery = normalizeFileQuery(query);
          if (!normalizedQuery) {
            return allItems;
          }
          const hasTrailingSlash = normalizedQuery.endsWith('/');
          const normalizedQueryNoSlash = hasTrailingSlash
            ? normalizedQuery.slice(0, -1)
            : normalizedQuery;
          const matches = (value: string) => {
            const normalizedValue = normalizeMatchText(value);
            if (
              hasTrailingSlash &&
              normalizedValue === normalizedQueryNoSlash
            ) {
              return true;
            }
            return normalizedValue.includes(normalizedQuery);
          };
          return allItems.filter(
            (item) =>
              matches(item.label) ||
              (item.description ? matches(item.description) : false),
          );
        }

        // If first time and still loading, show a placeholder
        if (allItems.length === 0) {
          return [
            {
              id: 'loading-files',
              label: 'Searching files…',
              description: 'Type to filter, or wait a moment…',
              type: 'info' as const,
            },
          ];
        }

        return allItems;
      } else {
        // Handle slash commands
        const userIcon = <UserIcon />;

        const getSubcommands = (cmd: Record<string, unknown>) =>
          (cmd.subcommands ??
            (cmd as { subCommands?: Array<Record<string, unknown>> })
              .subCommands ??
            []) as Array<Record<string, unknown>>;

        const makeItem = (
          label: string,
          description: string | undefined,
          value: string,
        ): CompletionItem => ({
          id: `/${value}`,
          label,
          description,
          type: 'command' as const,
          icon: userIcon,
          value,
        });

        const rawQuery = query ?? '';
        const trimmedQuery = rawQuery.trim();
        const endsWithSpace = /\s$/.test(rawQuery);

        if (!trimmedQuery) {
          return availableCommands.map((cmd) =>
            makeItem(
              `/${cmd.name as string}`,
              cmd.description as string,
              cmd.name as string,
            ),
          );
        }

        const parts = trimmedQuery.split(/\s+/);
        const exactTokens = endsWithSpace ? parts : parts.slice(0, -1);
        let currentCommands = availableCommands;
        const pathTokens: string[] = [];

        for (const token of exactTokens) {
          const match = currentCommands.find(
            (cmd) => (cmd.name as string).toLowerCase() === token.toLowerCase(),
          );
          if (!match) {
            return [];
          }
          pathTokens.push(match.name as string);
          currentCommands = getSubcommands(match);
        }

        const buildItems = (
          commands: Array<Record<string, unknown>>,
          prefixTokens: string[],
          filterPrefix?: string,
        ): CompletionItem[] => {
          const isTopLevel = prefixTokens.length === 0;
          return commands
            .filter((cmd) => {
              if (!filterPrefix) {
                return true;
              }
              return (cmd.name as string)
                .toLowerCase()
                .startsWith(filterPrefix.toLowerCase());
            })
            .map((cmd) => {
              const name = cmd.name as string;
              const label = isTopLevel ? `/${name}` : name;
              const value = [...prefixTokens, name].join(' ');
              return makeItem(label, cmd.description as string, value);
            });
        };

        if (endsWithSpace) {
          return buildItems(currentCommands, pathTokens);
        }

        const lastToken = parts[parts.length - 1] ?? '';
        const exactMatch = currentCommands.find(
          (cmd) =>
            (cmd.name as string).toLowerCase() === lastToken.toLowerCase(),
        );
        if (exactMatch) {
          const subcommands = getSubcommands(exactMatch);
          if (subcommands.length > 0) {
            return buildItems(subcommands, [
              ...pathTokens,
              exactMatch.name as string,
            ]);
          }
        }

        return buildItems(currentCommands, pathTokens, lastToken);
      }
    },
    [fileContext, availableCommands, normalizeFileQuery, normalizeMatchText],
  );
  const completion = useCompletionTrigger(inputFieldRef, getCompletionItems);

  // Track a lightweight signature of workspace files to detect content changes even when length is unchanged
  const workspaceFilesSignature = useMemo(
    () =>
      fileContext.workspaceFiles
        .map(
          (file) =>
            `${file.id}|${file.label}|${file.description ?? ''}|${file.path}`,
        )
        .join('||'),
    [fileContext.workspaceFiles],
  );

  // When workspace files update while menu open for @, refresh items so the first @ shows the list
  // Note: Avoid depending on the entire `completion` object here, since its identity
  // changes on every render which would retrigger this effect and can cause a refresh loop.
  useEffect(() => {
    // Only auto-refresh when there's no query (first @ popup) to avoid repeated refreshes during search
    if (
      completion.isOpen &&
      completion.triggerChar === '@' &&
      !completion.query
    ) {
      // Only refresh items; do not change other completion state to avoid re-renders loops
      completion.refreshCompletion();
    }
    // Only re-run when the actual data source changes, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    workspaceFilesSignature,
    completion.isOpen,
    completion.triggerChar,
    completion.query,
  ]);

  // Message submission
  const { handleSubmit: submitMessage } = useMessageSubmit({
    inputText,
    setInputText,
    messageHandling,
    fileContext,
    skipAutoActiveContext,
    vscode,
    inputFieldRef,
    isStreaming: messageHandling.isStreaming,
    isWaitingForResponse: messageHandling.isWaitingForResponse,
  });

  // Handle cancel/stop from the input bar
  // Emit a cancel to the extension and immediately reflect interruption locally.
  const handleCancel = useCallback(() => {
    if (messageHandling.isStreaming || messageHandling.isWaitingForResponse) {
      // Proactively end local states and add an 'Interrupted' line
      try {
        messageHandling.endStreaming?.();
      } catch {
        /* no-op */
      }
      try {
        messageHandling.clearWaitingForResponse?.();
      } catch {
        /* no-op */
      }
      messageHandling.addMessage({
        role: 'assistant',
        content: 'Interrupted',
        timestamp: Date.now(),
      });
    }
    // Notify extension/agent to cancel server-side work
    vscode.postMessage({
      type: 'cancelStreaming',
      data: {},
    });
  }, [messageHandling, vscode]);

  // Message handling
  useWebViewMessages({
    sessionManagement,
    fileContext,
    messageHandling,
    handleToolCallUpdate,
    clearToolCalls,
    setPlanEntries,
    handlePermissionRequest: setPermissionRequest,
    handleConfirmActionRequest: setConfirmActionRequest,
    inputFieldRef,
    setInputText,
    setEditMode,
    setIsAuthenticated,
    setAvailableCommands,
  });

  // Auto-scroll handling: keep the view pinned to bottom when new content arrives,
  // but don't interrupt the user if they scrolled up.
  // We track whether the user is currently "pinned" to the bottom (near the end).
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const prevCountsRef = useRef({ msgLen: 0, inProgLen: 0, doneLen: 0 });

  // Observe scroll position to know if user has scrolled away from the bottom.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    const onScroll = () => {
      // Use a small threshold so slight deltas don't flip the state.
      // Note: there's extra bottom padding for the input area, so keep this a bit generous.
      const threshold = 80; // px tolerance
      const distanceFromBottom =
        container.scrollHeight - (container.scrollTop + container.clientHeight);
      setPinnedToBottom(distanceFromBottom <= threshold);
    };

    // Initialize once mounted so first render is correct
    onScroll();
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // When content changes, if the user is pinned to bottom, keep it anchored there.
  // Only smooth-scroll when new items are appended; do not smooth for streaming chunk updates.
  useLayoutEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    // Detect whether new items were appended (vs. streaming chunk updates)
    const prev = prevCountsRef.current;
    const newMsg = messageHandling.messages.length > prev.msgLen;
    const newInProg = inProgressToolCalls.length > prev.inProgLen;
    const newDone = completedToolCalls.length > prev.doneLen;
    prevCountsRef.current = {
      msgLen: messageHandling.messages.length,
      inProgLen: inProgressToolCalls.length,
      doneLen: completedToolCalls.length,
    };

    if (!pinnedToBottom) {
      // Do nothing if user scrolled away; avoid stealing scroll.
      return;
    }

    const smooth = newMsg || newInProg || newDone; // avoid smooth on streaming chunks

    // Anchor to the bottom on next frame to avoid layout thrash.
    const raf = requestAnimationFrame(() => {
      const top = container.scrollHeight - container.clientHeight;
      // Use scrollTo to avoid cross-context issues with scrollIntoView.
      container.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    });
    return () => cancelAnimationFrame(raf);
  }, [
    pinnedToBottom,
    messageHandling.messages,
    inProgressToolCalls,
    completedToolCalls,
    messageHandling.isWaitingForResponse,
    messageHandling.loadingMessage,
    messageHandling.isStreaming,
    planEntries,
  ]);

  // When the last rendered item resizes (e.g., images/code blocks load/expand),
  // if we're pinned to bottom, keep it anchored there.
  useEffect(() => {
    const container = messagesContainerRef.current;
    const endEl = messagesEndRef.current;
    if (!container || !endEl) {
      return;
    }

    const lastItem = endEl.previousElementSibling as HTMLElement | null;
    if (!lastItem) {
      return;
    }

    let frame = 0;
    const ro = new ResizeObserver(() => {
      if (!pinnedToBottom) {
        return;
      }
      // Defer to next frame to avoid thrash during rapid size changes
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = container.scrollHeight - container.clientHeight;
        container.scrollTo({ top });
      });
    });
    ro.observe(lastItem);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [
    pinnedToBottom,
    messageHandling.messages,
    inProgressToolCalls,
    completedToolCalls,
  ]);

  // Set loading state to false after initial mount and when we have authentication info
  useEffect(() => {
    // If we have determined authentication status, we're done loading
    if (isAuthenticated !== null) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Handle permission response
  const handlePermissionResponse = useCallback(
    (optionId: string) => {
      // Forward the selected optionId directly to extension as ACP permission response
      // Expected values include: 'proceed_once', 'proceed_always', 'cancel', 'proceed_always_server', etc.
      vscode.postMessage({
        type: 'permissionResponse',
        data: { optionId },
      });
      setPermissionRequest(null);
    },
    [vscode],
  );

  const confirmActionOptions = useMemo<PermissionOption[]>(
    () => [
      { name: 'Confirm', kind: 'proceed', optionId: 'confirm' },
      { name: 'Cancel', kind: 'reject', optionId: 'cancel' },
    ],
    [],
  );

  const handleConfirmActionResponse = useCallback(
    (optionId: string) => {
      const request = confirmActionRequest;
      setConfirmActionRequest(null);
      if (!request) {
        return;
      }
      if (optionId === 'confirm' && request.raw) {
        vscode.postMessage({
          type: 'sendMessage',
          data: { text: request.raw },
        });
      } else {
        messageHandling.addMessage({
          role: 'assistant',
          content: 'Operation cancelled.',
          timestamp: Date.now(),
        });
      }
    },
    [confirmActionRequest, messageHandling, vscode],
  );

  // Handle completion selection
  // When user sends a message after scrolling up, re-pin and jump to the bottom
  const submitHandler = (e: React.FormEvent) => {
    setPinnedToBottom(true);

    const container = messagesContainerRef.current;
    if (container) {
      const top = container.scrollHeight - container.clientHeight;
      container.scrollTo({ top });
    }

    submitMessage(e);
  };

  const handleSubmitWithScroll = useCallback(submitHandler, [submitMessage]);

  const handleCompletionSelect = useCallback(
    (item: CompletionItem) => {
      // Handle completion selection by inserting the value into the input field
      const inputElement = inputFieldRef.current;
      if (!inputElement) {
        return;
      }

      // Ignore info items (placeholders like "Searching files…")
      if (item.type === 'info') {
        completion.closeCompletion();
        return;
      }

      // Slash commands
      if (item.type === 'command') {
        const command = (item.label || '').trim();
        // Special case for /login: execute immediately
        if (command === '/login') {
          vscode.postMessage({ type: 'login', data: {} });
          completion.closeCompletion();
          return;
        }
        const getSubcommands = (cmd: Record<string, unknown>) =>
          (cmd.subcommands ??
            (cmd as { subCommands?: Array<Record<string, unknown>> })
              .subCommands ??
            []) as Array<Record<string, unknown>>;

        const findCommandByTokens = (
          commands: Array<Record<string, unknown>>,
          tokens: string[],
        ): Record<string, unknown> | null => {
          let currentCommands = commands;
          let current: Record<string, unknown> | null = null;

          for (const token of tokens) {
            const match =
              currentCommands.find(
                (cmd) =>
                  (cmd.name as string).toLowerCase() === token.toLowerCase(),
              ) || null;
            if (!match) {
              return null;
            }
            current = match;
            currentCommands = getSubcommands(match);
          }

          return current;
        };

        const getCompletionPosition = (
          element: HTMLDivElement,
        ): { top: number; left: number } => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            if (rect.top > 0 && rect.left > 0) {
              return { top: rect.top, left: rect.left };
            }
          }
          const inputRect = element.getBoundingClientRect();
          return { top: inputRect.top, left: inputRect.left };
        };

        // For other commands, insert into the input field
        const commandLabel =
          typeof item.value === 'string' ? item.value : String(item.label);
        const commandName = commandLabel.startsWith('/')
          ? commandLabel.substring(1)
          : commandLabel;
        const tokens = commandName.split(/\s+/).filter(Boolean);
        const matchedCommand = findCommandByTokens(availableCommands, tokens);
        const hasSubcommands =
          matchedCommand && getSubcommands(matchedCommand).length > 0;
        const newText = `/${commandName} `;
        inputElement.textContent = newText;
        setInputText(newText);
        // Move caret to the end
        const newRange = document.createRange();
        const sel = window.getSelection();
        newRange.selectNodeContents(inputElement);
        newRange.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(newRange);
        if (hasSubcommands) {
          const position = getCompletionPosition(inputElement);
          void completion.openCompletion('/', `${commandName} `, position);
        } else {
          completion.closeCompletion();
        }
        return;
      }

      // If selecting a file, add @filename -> fullpath mapping
      if (item.type === 'file' && item.value && item.path) {
        try {
          fileContext.addFileReference(item.value, item.path);
        } catch (err) {
          console.warn('[App] addFileReference failed:', err);
        }
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        return;
      }

      // Current text and cursor
      const text = inputElement.textContent || '';
      const range = selection.getRangeAt(0);

      // Compute total text offset for contentEditable
      let cursorPos = text.length;
      if (range.startContainer === inputElement) {
        const childIndex = range.startOffset;
        let offset = 0;
        for (
          let i = 0;
          i < childIndex && i < inputElement.childNodes.length;
          i++
        ) {
          offset += inputElement.childNodes[i].textContent?.length || 0;
        }
        cursorPos = offset || text.length;
      } else if (range.startContainer.nodeType === Node.TEXT_NODE) {
        const walker = document.createTreeWalker(
          inputElement,
          NodeFilter.SHOW_TEXT,
          null,
        );
        let offset = 0;
        let found = false;
        let node: Node | null = walker.nextNode();
        while (node) {
          if (node === range.startContainer) {
            offset += range.startOffset;
            found = true;
            break;
          }
          offset += node.textContent?.length || 0;
          node = walker.nextNode();
        }
        cursorPos = found ? offset : text.length;
      }

      // Replace from trigger to cursor with selected value
      const textBeforeCursor = text.substring(0, cursorPos);
      const atPos = textBeforeCursor.lastIndexOf('@');
      const slashPos = textBeforeCursor.lastIndexOf('/');
      const triggerPos = Math.max(atPos, slashPos);

      if (triggerPos >= 0) {
        const insertValue =
          typeof item.value === 'string' ? item.value : String(item.label);
        const newText =
          text.substring(0, triggerPos + 1) + // keep the trigger symbol
          insertValue +
          ' ' +
          text.substring(cursorPos);

        // Update DOM and state, and move caret to end
        inputElement.textContent = newText;
        setInputText(newText);

        const newRange = document.createRange();
        const sel = window.getSelection();
        newRange.selectNodeContents(inputElement);
        newRange.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(newRange);
      }

      // Close the completion menu
      completion.closeCompletion();
    },
    [
      availableCommands,
      completion,
      inputFieldRef,
      setInputText,
      fileContext,
      vscode,
    ],
  );

  // Handle attach context click
  const handleAttachContextClick = useCallback(() => {
    // Open native file picker (different from '@' completion which searches workspace files)
    vscode.postMessage({
      type: 'attachFile',
      data: {},
    });
  }, [vscode]);

  // Handle toggle edit mode (Default -> Auto-edit -> YOLO -> Default)
  const handleToggleEditMode = useCallback(() => {
    setEditMode((prev) => {
      const next: ApprovalModeValue = NEXT_APPROVAL_MODE[prev];

      // Notify extension to set approval mode via ACP
      try {
        vscode.postMessage({
          type: 'setApprovalMode',
          data: { modeId: next },
        });
      } catch {
        /* no-op */
      }
      return next;
    });
  }, [vscode]);

  // Handle toggle thinking
  const handleToggleThinking = () => {
    setThinkingEnabled((prev) => !prev);
  };

  // Create unified message array containing all types of messages and tool calls
  const allMessages = useMemo<
    Array<{
      type: 'message' | 'in-progress-tool-call' | 'completed-tool-call';
      data: TextMessage | ToolCallData;
      timestamp: number;
    }>
  >(() => {
    // Regular messages
    const regularMessages = messageHandling.messages.map((msg) => ({
      type: 'message' as const,
      data: msg,
      timestamp: msg.timestamp,
    }));

    // In-progress tool calls
    const inProgressTools = inProgressToolCalls.map((toolCall) => ({
      type: 'in-progress-tool-call' as const,
      data: toolCall,
      timestamp: toolCall.timestamp || Date.now(),
    }));

    // Completed tool calls
    const completedTools = completedToolCalls
      .filter(hasToolCallOutput)
      .map((toolCall) => ({
        type: 'completed-tool-call' as const,
        data: toolCall,
        timestamp: toolCall.timestamp || Date.now(),
      }));

    // Merge and sort by timestamp to ensure messages and tool calls are interleaved
    return [...regularMessages, ...inProgressTools, ...completedTools].sort(
      (a, b) => (a.timestamp || 0) - (b.timestamp || 0),
    );
  }, [messageHandling.messages, inProgressToolCalls, completedToolCalls]);

  console.log('[App] Rendering messages:', allMessages);

  // Render all messages and tool calls
  const renderMessages = useCallback<() => React.ReactNode>(
    () =>
      allMessages.map((item, index) => {
        switch (item.type) {
          case 'message': {
            const msg = item.data as TextMessage;
            const handleFileClick = (path: string): void => {
              vscode.postMessage({
                type: 'openFile',
                data: { path },
              });
            };

            if (msg.role === 'thinking') {
              return (
                <ThinkingMessage
                  key={`message-${index}`}
                  content={msg.content || ''}
                  timestamp={msg.timestamp || 0}
                  onFileClick={handleFileClick}
                />
              );
            }

            if (msg.role === 'user') {
              return (
                <UserMessage
                  key={`message-${index}`}
                  content={msg.content || ''}
                  timestamp={msg.timestamp || 0}
                  onFileClick={handleFileClick}
                  fileContext={msg.fileContext}
                />
              );
            }

            {
              const content = (msg.content || '').trim();
              if (content === 'Interrupted' || content === 'Tool interrupted') {
                return (
                  <InterruptedMessage key={`message-${index}`} text={content} />
                );
              }
              return (
                <AssistantMessage
                  key={`message-${index}`}
                  content={content}
                  timestamp={msg.timestamp || 0}
                  onFileClick={handleFileClick}
                />
              );
            }
          }

          case 'in-progress-tool-call':
          case 'completed-tool-call': {
            const prev = allMessages[index - 1];
            const next = allMessages[index + 1];
            const isToolCallType = (
              x: unknown,
            ): x is { type: 'in-progress-tool-call' | 'completed-tool-call' } =>
              !!x &&
              typeof x === 'object' &&
              'type' in (x as Record<string, unknown>) &&
              ((x as { type: string }).type === 'in-progress-tool-call' ||
                (x as { type: string }).type === 'completed-tool-call');
            const isFirst = !isToolCallType(prev);
            const isLast = !isToolCallType(next);
            return (
              <ToolCall
                key={`toolcall-${(item.data as ToolCallData).toolCallId}-${item.type}`}
                toolCall={item.data as ToolCallData}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          }

          default:
            return null;
        }
      }),
    [allMessages, vscode],
  );

  const hasContent =
    messageHandling.messages.length > 0 ||
    messageHandling.isStreaming ||
    inProgressToolCalls.length > 0 ||
    completedToolCalls.length > 0 ||
    planEntries.length > 0 ||
    allMessages.length > 0;

  return (
    <div className="chat-container relative">
      {/* Top-level loading overlay */}
      {isLoading && (
        <div className="bg-background/80 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <p className="text-muted-foreground text-sm">
              Preparing Gus Qwen...
            </p>
          </div>
        </div>
      )}

      <SessionSelector
        visible={sessionManagement.showSessionSelector}
        sessions={sessionManagement.filteredSessions}
        currentSessionId={sessionManagement.currentSessionId}
        searchQuery={sessionManagement.sessionSearchQuery}
        onSearchChange={sessionManagement.setSessionSearchQuery}
        onSelectSession={(sessionId) => {
          sessionManagement.handleSwitchSession(sessionId);
          sessionManagement.setSessionSearchQuery('');
        }}
        onClose={() => sessionManagement.setShowSessionSelector(false)}
        hasMore={sessionManagement.hasMore}
        isLoading={sessionManagement.isLoading}
        onLoadMore={sessionManagement.handleLoadMoreSessions}
      />

      <ChatHeader
        currentSessionTitle={sessionManagement.currentSessionTitle}
        onLoadSessions={sessionManagement.handleLoadQwenSessions}
        onNewSession={sessionManagement.handleNewQwenSession}
      />

      <div
        ref={messagesContainerRef}
        className="chat-messages messages-container flex-1 overflow-y-auto overflow-x-hidden pt-5 pr-5 pl-5 pb-[140px] flex flex-col relative min-w-0 focus:outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:hover:bg-white/30 [&>*]:flex [&>*]:gap-0 [&>*]:items-start [&>*]:text-left [&>*]:py-2 [&>*:not(:last-child)]:pb-[8px] [&>*]:flex-col [&>*]:relative [&>*]:animate-[fadeIn_0.2s_ease-in]"
      >
        {!hasContent && !isLoading ? (
          isAuthenticated === false ? (
            <Onboarding
              onLogin={() => {
                vscode.postMessage({ type: 'login', data: {} });
                messageHandling.setWaitingForResponse(
                  'Logging in to Gus Qwen...',
                );
              }}
            />
          ) : isAuthenticated === null ? (
            <EmptyState loadingMessage="Checking login status…" />
          ) : (
            <EmptyState isAuthenticated />
          )
        ) : (
          <>
            {/* Render all messages and tool calls */}
            {renderMessages()}

            {/* Waiting message positioned fixed above the input form to avoid layout shifts */}
            {messageHandling.isWaitingForResponse &&
              messageHandling.loadingMessage && (
                <div className="waiting-message-slot min-h-[28px]">
                  <WaitingMessage
                    loadingMessage={messageHandling.loadingMessage}
                  />
                </div>
              )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {isAuthenticated && (
        <InputForm
          inputText={inputText}
          inputFieldRef={inputFieldRef}
          isStreaming={messageHandling.isStreaming}
          isWaitingForResponse={messageHandling.isWaitingForResponse}
          isComposing={isComposing}
          editMode={editMode}
          thinkingEnabled={thinkingEnabled}
          activeFileName={fileContext.activeFileName}
          activeSelection={fileContext.activeSelection}
          skipAutoActiveContext={skipAutoActiveContext}
          onInputChange={setInputText}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={() => {}}
          onSubmit={handleSubmitWithScroll}
          onCancel={handleCancel}
          onToggleEditMode={handleToggleEditMode}
          onToggleThinking={handleToggleThinking}
          onFocusActiveEditor={fileContext.focusActiveEditor}
          onToggleSkipAutoActiveContext={() =>
            setSkipAutoActiveContext((v) => !v)
          }
          onShowCommandMenu={async () => {
            if (inputFieldRef.current) {
              inputFieldRef.current.focus();

              const selection = window.getSelection();
              let position = { top: 0, left: 0 };

              if (selection && selection.rangeCount > 0) {
                try {
                  const range = selection.getRangeAt(0);
                  const rangeRect = range.getBoundingClientRect();
                  if (rangeRect.top > 0 && rangeRect.left > 0) {
                    position = {
                      top: rangeRect.top,
                      left: rangeRect.left,
                    };
                  } else {
                    const inputRect =
                      inputFieldRef.current.getBoundingClientRect();
                    position = { top: inputRect.top, left: inputRect.left };
                  }
                } catch (error) {
                  console.error('[App] Error getting cursor position:', error);
                  const inputRect =
                    inputFieldRef.current.getBoundingClientRect();
                  position = { top: inputRect.top, left: inputRect.left };
                }
              } else {
                const inputRect = inputFieldRef.current.getBoundingClientRect();
                position = { top: inputRect.top, left: inputRect.left };
              }

              await completion.openCompletion('/', '', position);
            }
          }}
          onAttachContext={handleAttachContextClick}
          completionIsOpen={completion.isOpen}
          completionItems={completion.items}
          onCompletionSelect={handleCompletionSelect}
          onCompletionClose={completion.closeCompletion}
        />
      )}

      {confirmActionRequest && !permissionRequest && (
        <PermissionDrawer
          isOpen={!!confirmActionRequest}
          options={confirmActionOptions}
          toolCall={{
            title: confirmActionRequest.prompt,
            kind: 'confirm_action',
          }}
          onResponse={handleConfirmActionResponse}
          onClose={() => setConfirmActionRequest(null)}
        />
      )}

      {permissionRequest && (
        <PermissionDrawer
          isOpen={!!permissionRequest}
          options={permissionRequest.options}
          toolCall={permissionRequest.toolCall}
          onResponse={handlePermissionResponse}
          onClose={() => setPermissionRequest(null)}
        />
      )}
    </div>
  );
};

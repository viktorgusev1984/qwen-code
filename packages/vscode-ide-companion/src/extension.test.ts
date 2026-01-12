/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as vscode from 'vscode';
import { activate } from './extension.js';
import {
  IDE_DEFINITIONS,
  detectIdeFromEnv,
} from '@psd-tech/gusqwen-core/src/ide/detect-ide.js';

vi.mock('node:fs', () => ({
  promises: {
    mkdtemp: vi.fn(async () => '/tmp/gusqwen-vsix-'),
    writeFile: vi.fn(async () => undefined),
    rm: vi.fn(async () => undefined),
  },
}));

vi.mock('@psd-tech/gusqwen-core/src/ide/detect-ide.js', async () => {
  const actual = await vi.importActual(
    '@psd-tech/gusqwen-core/src/ide/detect-ide.js',
  );
  return {
    ...actual,
    detectIdeFromEnv: vi.fn(() => IDE_DEFINITIONS.vscode),
  };
});

vi.mock('vscode', () => ({
  window: {
    createOutputChannel: vi.fn(() => ({
      appendLine: vi.fn(),
    })),
    showInformationMessage: vi.fn(),
    createTerminal: vi.fn(() => ({
      show: vi.fn(),
      sendText: vi.fn(),
    })),
    onDidChangeActiveTextEditor: vi.fn(),
    activeTextEditor: undefined,
    tabGroups: {
      all: [],
      close: vi.fn(),
    },
    showTextDocument: vi.fn(),
    showWorkspaceFolderPick: vi.fn(),
    registerWebviewPanelSerializer: vi.fn(() => ({
      dispose: vi.fn(),
    })),
  },
  workspace: {
    workspaceFolders: [],
    onDidCloseTextDocument: vi.fn(),
    registerTextDocumentContentProvider: vi.fn(),
    onDidChangeWorkspaceFolders: vi.fn(),
    onDidGrantWorkspaceTrust: vi.fn(),
  },
  commands: {
    registerCommand: vi.fn(),
    executeCommand: vi.fn(),
  },
  Uri: {
    joinPath: vi.fn(),
    file: vi.fn((fsPath: string) => ({ fsPath })),
  },
  ExtensionMode: {
    Development: 1,
    Production: 2,
  },
  EventEmitter: vi.fn(() => ({
    event: vi.fn(),
    fire: vi.fn(),
    dispose: vi.fn(),
  })),
  extensions: {
    getExtension: vi.fn(),
  },
}));

describe('activate', () => {
  let context: vscode.ExtensionContext;

  beforeEach(() => {
    vi.mocked(vscode.window.showInformationMessage).mockResolvedValue(
      undefined,
    );
    context = {
      subscriptions: [],
      environmentVariableCollection: {
        replace: vi.fn(),
      },
      globalState: {
        get: vi.fn(),
        update: vi.fn(),
      },
      extensionUri: {
        fsPath: '/path/to/extension',
      },
      extension: {
        packageJSON: {
          version: '1.1.0',
        },
      },
    } as unknown as vscode.ExtensionContext;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show the info message on first activation', async () => {
    const showInformationMessageMock = vi
      .mocked(vscode.window.showInformationMessage)
      .mockResolvedValue(undefined as never);
    vi.mocked(context.globalState.get).mockReturnValue(undefined);
    vi.mocked(vscode.extensions.getExtension).mockReturnValue({
      packageJSON: { version: '1.1.0' },
    } as vscode.Extension<unknown>);
    await activate(context);
    expect(showInformationMessageMock).toHaveBeenCalledWith(
      'Gus Qwen Companion extension successfully installed.',
    );
  });

  it('should not show the info message on subsequent activations', async () => {
    vi.mocked(context.globalState.get).mockReturnValue(true);
    vi.mocked(vscode.extensions.getExtension).mockReturnValue({
      packageJSON: { version: '1.1.0' },
    } as vscode.Extension<unknown>);
    await activate(context);
    expect(vscode.window.showInformationMessage).not.toHaveBeenCalled();
  });

  it('should register a handler for onDidGrantWorkspaceTrust', async () => {
    await activate(context);
    expect(vscode.workspace.onDidGrantWorkspaceTrust).toHaveBeenCalled();
  });

  it('should launch the Gus Qwen when the user clicks the button', async () => {
    const showInformationMessageMock = vi
      .mocked(vscode.window.showInformationMessage)
      .mockResolvedValue('Run Gus Qwen' as never);
    vi.mocked(context.globalState.get).mockReturnValue(undefined);
    vi.mocked(vscode.extensions.getExtension).mockReturnValue({
      packageJSON: { version: '1.1.0' },
    } as vscode.Extension<unknown>);
    await activate(context);
    expect(showInformationMessageMock).toHaveBeenCalledWith(
      'Gus Qwen Companion extension successfully installed.',
    );
  });

  describe('update notification', () => {
    const latestVsixUrl =
      'https://s3-msk.tinkoff.ru/psd-tech-gusqwen/vscode/gusqwen-vscode-ide-companion-1.2.0.vsix';

    beforeEach(() => {
      // Prevent the "installed" message from showing
      vi.mocked(context.globalState.get).mockReturnValue(true);
    });

    it('should show an update notification if a newer version is available', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          version: '1.2.0',
          vsixUrl: latestVsixUrl,
        }),
      } as Response);

      const showInformationMessageMock = vi.mocked(
        vscode.window.showInformationMessage,
      );

      await activate(context);

      expect(showInformationMessageMock).toHaveBeenCalledWith(
        'A new version (1.2.0) of the Gus Qwen Companion extension is available.',
        'Update to latest version',
      );
    });

    it('should not show an update notification if the version is the same', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          version: '1.1.0',
          vsixUrl: latestVsixUrl,
        }),
      } as Response);

      const showInformationMessageMock = vi.mocked(
        vscode.window.showInformationMessage,
      );

      await activate(context);

      expect(showInformationMessageMock).not.toHaveBeenCalled();
    });

    it.each([
      {
        ide: IDE_DEFINITIONS.cloudshell,
      },
      { ide: IDE_DEFINITIONS.firebasestudio },
    ])('does not show the notification for $ide.name', async ({ ide }) => {
      vi.mocked(detectIdeFromEnv).mockReturnValue(ide);
      vi.mocked(context.globalState.get).mockReturnValue(undefined);
      const showInformationMessageMock = vi.mocked(
        vscode.window.showInformationMessage,
      );

      await activate(context);

      expect(showInformationMessageMock).not.toHaveBeenCalled();
    });

    it('should not show an update notification if the version is older', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          version: '1.0.0',
          vsixUrl: latestVsixUrl,
        }),
      } as Response);

      const showInformationMessageMock = vi.mocked(
        vscode.window.showInformationMessage,
      );

      await activate(context);

      expect(showInformationMessageMock).not.toHaveBeenCalled();
    });

    it('should execute the install command when the user clicks "Update"', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async (input) => {
        const url =
          typeof input === 'string'
            ? input
            : 'url' in input
              ? input.url
              : input.toString();
        if (url.endsWith('/latest.json')) {
          return {
            ok: true,
            json: async () => ({
              version: '1.2.0',
              vsixUrl: latestVsixUrl,
            }),
          } as Response;
        }
        if (url === latestVsixUrl) {
          return {
            ok: true,
            arrayBuffer: async () => new ArrayBuffer(8),
          } as Response;
        }
        throw new Error(`Unexpected fetch URL: ${url}`);
      });
      vi.mocked(vscode.window.showInformationMessage).mockResolvedValue(
        'Update to latest version' as never,
      );
      const executeCommandMock = vi.mocked(vscode.commands.executeCommand);

      await activate(context);

      // Wait for the promise from showInformationMessage.then() to resolve
      await new Promise(process.nextTick);

      expect(executeCommandMock).toHaveBeenCalledWith(
        'workbench.extensions.installExtension',
        { fsPath: '/tmp/gusqwen-vsix-/gusqwen-vscode-ide-companion.vsix' },
      );
    });

    it('should handle fetch errors gracefully', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response);

      const showInformationMessageMock = vi.mocked(
        vscode.window.showInformationMessage,
      );

      await activate(context);

      expect(showInformationMessageMock).not.toHaveBeenCalled();
    });
  });
});

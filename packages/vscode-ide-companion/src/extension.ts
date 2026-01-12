/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as vscode from 'vscode';
import { IDEServer } from './ide-server.js';
import semver from 'semver';
import { DiffContentProvider, DiffManager } from './diff-manager.js';
import { createLogger } from './utils/logger.js';
import {
  detectIdeFromEnv,
  IDE_DEFINITIONS,
  type IdeInfo,
} from '@psd-tech/gusqwen-core/src/ide/detect-ide.js';
import { WebViewProvider } from './webview/WebViewProvider.js';
import { registerNewCommands } from './commands/index.js';

const VSCODE_VSIX_BASE_URL =
  'https://s3-msk.tinkoff.ru/psd-tech-gusqwen/vscode';
const VSCODE_VSIX_LATEST_URL = `${VSCODE_VSIX_BASE_URL}/latest.json`;
const VSCODE_VSIX_FILENAME_PREFIX = 'gusqwen-vscode-ide-companion';
const INFO_MESSAGE_SHOWN_KEY = 'qwenCodeInfoMessageShown';
export const DIFF_SCHEME = 'gusqwen-diff';

/**
 * IDE environments where the installation greeting is hidden.  In these
 * environments we either are pre-installed and the installation message is
 * confusing or we just want to be quiet.
 */
const HIDE_INSTALLATION_GREETING_IDES: ReadonlySet<IdeInfo['name']> = new Set([
  IDE_DEFINITIONS.firebasestudio.name,
  IDE_DEFINITIONS.cloudshell.name,
]);

let ideServer: IDEServer;
let logger: vscode.OutputChannel;
let webViewProviders: WebViewProvider[] = []; // Track multiple chat tabs

let log: (message: string) => void = () => {};

type LatestVsixManifest = {
  version?: string;
  vsixUrl?: string;
  versions?: Array<{ version?: string; vsixUrl?: string }>;
};

function buildVsixUrl(version: string): string {
  return `${VSCODE_VSIX_BASE_URL}/${VSCODE_VSIX_FILENAME_PREFIX}-${version}.vsix`;
}

async function downloadVsix(vsixUrl: string): Promise<{
  vsixPath: string;
  cleanup: () => Promise<void>;
}> {
  const response = await fetch(vsixUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to download VSIX from ${vsixUrl}: ${response.status} ${response.statusText}`,
    );
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const tempDir = await fs.promises.mkdtemp(
    path.join(os.tmpdir(), 'gusqwen-vsix-'),
  );
  const vsixPath = path.join(tempDir, `${VSCODE_VSIX_FILENAME_PREFIX}.vsix`);
  await fs.promises.writeFile(vsixPath, buffer);
  return {
    vsixPath,
    cleanup: async () => {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    },
  };
}

async function checkForUpdates(
  context: vscode.ExtensionContext,
  log: (message: string) => void,
) {
  try {
    const currentVersion = context.extension.packageJSON.version;

    const response = await fetch(VSCODE_VSIX_LATEST_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      log(
        `Failed to fetch latest version info from S3: ${response.statusText}`,
      );
      return;
    }

    const data = (await response.json()) as LatestVsixManifest | null;
    const latestVersion =
      data?.version ??
      (Array.isArray(data?.versions)
        ? data?.versions?.[0]?.version
        : undefined);

    if (typeof latestVersion !== 'string' || !semver.valid(latestVersion)) {
      log(`Invalid latest version info from S3: ${String(latestVersion)}`);
      return;
    }

    if (semver.gt(latestVersion, currentVersion)) {
      const selection = await vscode.window.showInformationMessage(
        `A new version (${latestVersion}) of the Gus Qwen Companion extension is available.`,
        'Update to latest version',
      );
      if (selection === 'Update to latest version') {
        const vsixUrl = data?.vsixUrl ?? buildVsixUrl(latestVersion);
        try {
          const { vsixPath, cleanup } = await downloadVsix(vsixUrl);
          try {
            await vscode.commands.executeCommand(
              'workbench.extensions.installExtension',
              vscode.Uri.file(vsixPath),
            );
          } finally {
            await cleanup();
          }
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          log(`Failed to install VSIX update: ${message}`);
        }
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(`Error checking for extension updates: ${message}`);
  }
}

export async function activate(context: vscode.ExtensionContext) {
  logger = vscode.window.createOutputChannel('Gus Qwen Companion');
  log = createLogger(context, logger);
  log('Extension activated');

  checkForUpdates(context, log);

  const diffContentProvider = new DiffContentProvider();
  const diffManager = new DiffManager(
    log,
    diffContentProvider,
    // Delay when any chat tab has a pending permission drawer
    () => webViewProviders.some((p) => p.hasPendingPermission()),
    // Suppress diffs when active mode is auto or yolo in any chat tab
    () => {
      const providers = webViewProviders.filter(
        (p) => typeof p.shouldSuppressDiff === 'function',
      );
      if (providers.length === 0) {
        return false;
      }
      return providers.every((p) => p.shouldSuppressDiff());
    },
  );

  // Helper function to create a new WebView provider instance
  const createWebViewProvider = (): WebViewProvider => {
    const provider = new WebViewProvider(context, context.extensionUri);
    webViewProviders.push(provider);
    return provider;
  };

  // Register WebView panel serializer for persistence across reloads
  context.subscriptions.push(
    vscode.window.registerWebviewPanelSerializer('gusqwen.chat', {
      async deserializeWebviewPanel(
        webviewPanel: vscode.WebviewPanel,
        state: unknown,
      ) {
        console.log(
          '[Extension] Deserializing WebView panel with state:',
          state,
        );

        // Create a new provider for the restored panel
        const provider = createWebViewProvider();
        console.log('[Extension] Provider created for deserialization');

        // Restore state if available BEFORE restoring the panel
        if (state && typeof state === 'object') {
          console.log('[Extension] Restoring state:', state);
          provider.restoreState(
            state as {
              conversationId: string | null;
              agentInitialized: boolean;
            },
          );
        } else {
          console.log('[Extension] No state to restore or invalid state');
        }

        await provider.restorePanel(webviewPanel);
        console.log('[Extension] Panel restore completed');

        log('WebView panel restored from serialization');
      },
    }),
  );

  // Register newly added commands via commands module
  registerNewCommands(
    context,
    log,
    diffManager,
    () => webViewProviders,
    createWebViewProvider,
  );

  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument((doc) => {
      if (doc.uri.scheme === DIFF_SCHEME) {
        diffManager.cancelDiff(doc.uri);
      }
    }),
    vscode.workspace.registerTextDocumentContentProvider(
      DIFF_SCHEME,
      diffContentProvider,
    ),
    (vscode.commands.registerCommand(
      'gusqwen.diff.accept',
      (uri?: vscode.Uri) => {
        const docUri = uri ?? vscode.window.activeTextEditor?.document.uri;
        if (docUri && docUri.scheme === DIFF_SCHEME) {
          diffManager.acceptDiff(docUri);
        }
        // If WebView is requesting permission, actively select an allow option (prefer once)
        try {
          for (const provider of webViewProviders) {
            if (provider?.hasPendingPermission()) {
              provider.respondToPendingPermission('allow');
            }
          }
        } catch (err) {
          console.warn('[Extension] Auto-allow on diff.accept failed:', err);
        }
        console.log('[Extension] Diff accepted');
      },
    ),
    vscode.commands.registerCommand(
      'gusqwen.diff.cancel',
      (uri?: vscode.Uri) => {
        const docUri = uri ?? vscode.window.activeTextEditor?.document.uri;
        if (docUri && docUri.scheme === DIFF_SCHEME) {
          diffManager.cancelDiff(docUri);
        }
        // If WebView is requesting permission, actively select reject/cancel
        try {
          for (const provider of webViewProviders) {
            if (provider?.hasPendingPermission()) {
              provider.respondToPendingPermission('cancel');
            }
          }
        } catch (err) {
          console.warn('[Extension] Auto-reject on diff.cancel failed:', err);
        }
        console.log('[Extension] Diff cancelled');
      },
    )),
    vscode.commands.registerCommand('gusqwen.diff.closeAll', async () => {
      try {
        await diffManager.closeAll();
      } catch (err) {
        console.warn('[Extension] gusqwen.diff.closeAll failed:', err);
      }
    }),
    vscode.commands.registerCommand(
      'gusqwen.diff.suppressBriefly',
      async () => {
        try {
          diffManager.suppressFor(1200);
        } catch (err) {
          console.warn('[Extension] gusqwen.diff.suppressBriefly failed:', err);
        }
      },
    ),
  );

  ideServer = new IDEServer(log, diffManager);
  try {
    await ideServer.start(context);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`Failed to start IDE server: ${message}`);
  }

  const infoMessageEnabled = !HIDE_INSTALLATION_GREETING_IDES.has(
    detectIdeFromEnv().name,
  );

  if (!context.globalState.get(INFO_MESSAGE_SHOWN_KEY) && infoMessageEnabled) {
    void vscode.window.showInformationMessage(
      'Gus Qwen Companion extension successfully installed.',
    );
    context.globalState.update(INFO_MESSAGE_SHOWN_KEY, true);
  }

  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      ideServer.syncEnvVars();
    }),
    vscode.workspace.onDidGrantWorkspaceTrust(() => {
      ideServer.syncEnvVars();
    }),
    vscode.commands.registerCommand(
      'gusqwen.runQwenCode',
      async (
        location?:
          | vscode.TerminalLocation
          | vscode.TerminalEditorLocationOptions,
      ) => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
          vscode.window.showInformationMessage(
            'No folder open. Please open a folder to run Gus Qwen.',
          );
          return;
        }

        let selectedFolder: vscode.WorkspaceFolder | undefined;
        if (workspaceFolders.length === 1) {
          selectedFolder = workspaceFolders[0];
        } else {
          selectedFolder = await vscode.window.showWorkspaceFolderPick({
            placeHolder: 'Select a folder to run Gus Qwen in',
          });
        }

        if (selectedFolder) {
          const cliEntry = vscode.Uri.joinPath(
            context.extensionUri,
            'dist',
            'gusqwen-cli',
            'cli.js',
          ).fsPath;
          const quote = (s: string) => `"${s.replaceAll('"', '\\"')}"`;
          const qwenCmd = `${quote(process.execPath)} ${quote(cliEntry)}`;
          const terminal = vscode.window.createTerminal({
            name: `Gus Qwen (${selectedFolder.name})`,
            cwd: selectedFolder.uri.fsPath,
            location,
          });
          terminal.show();
          terminal.sendText(qwenCmd);
        }
      },
    ),
    vscode.commands.registerCommand('gusqwen.showNotices', async () => {
      const noticePath = vscode.Uri.joinPath(
        context.extensionUri,
        'NOTICES.txt',
      );
      await vscode.window.showTextDocument(noticePath);
    }),
  );
}

export async function deactivate(): Promise<void> {
  log('Extension deactivated');
  try {
    if (ideServer) {
      await ideServer.stop();
    }
    // Dispose all WebView providers
    webViewProviders.forEach((provider) => {
      provider.dispose();
    });
    webViewProviders = [];
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`Failed to stop IDE server during deactivation: ${message}`);
  } finally {
    if (logger) {
      logger.dispose();
    }
  }
}

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as child_process from 'node:child_process';
import * as process from 'node:process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';
import { fileURLToPath } from 'node:url';
import { IDE_DEFINITIONS, type IdeInfo } from './detect-ide.js';
import { QWEN_CODE_COMPANION_EXTENSION_NAME } from './constants.js';

const VSCODE_VSIX_BASE_URL =
  'https://s3-msk.tinkoff.ru/psd-tech-gusqwen/vscode';
const DEFAULT_VSIX_VERSION = '0.3.1';

function getVsixVersion(): string {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
    const packagePath = path.join(
      repoRoot,
      'packages',
      'vscode-ide-companion',
      'package.json',
    );
    const raw = fs.readFileSync(packagePath, 'utf8');
    const parsed = JSON.parse(raw) as { version?: string };
    if (parsed.version) {
      return parsed.version;
    }
  } catch {
    // Fallback to default version when repo layout isn't available.
  }
  return DEFAULT_VSIX_VERSION;
}

function getVsixUrl(): string {
  const version = getVsixVersion();
  return `${VSCODE_VSIX_BASE_URL}/gusqwen-vscode-ide-companion-${version}.vsix`;
}

function getVsCodeCommand(platform: NodeJS.Platform = process.platform) {
  return platform === 'win32' ? 'code.cmd' : 'code';
}

export interface IdeInstaller {
  install(): Promise<InstallResult>;
}

export interface InstallResult {
  success: boolean;
  message: string;
}

async function findVsCodeCommand(
  platform: NodeJS.Platform = process.platform,
): Promise<string | null> {
  // 1. Check PATH first.
  const vscodeCommand = getVsCodeCommand(platform);
  try {
    if (platform === 'win32') {
      const result = child_process
        .execSync(`where.exe ${vscodeCommand}`)
        .toString()
        .trim();
      // `where.exe` can return multiple paths. Return the first one.
      const firstPath = result.split(/\r?\n/)[0];
      if (firstPath) {
        return firstPath;
      }
    } else {
      child_process.execSync(`command -v ${vscodeCommand}`, {
        stdio: 'ignore',
      });
      return vscodeCommand;
    }
  } catch {
    // Not in PATH, continue to check common locations.
  }

  // 2. Check common installation locations.
  const locations: string[] = [];
  const homeDir = os.homedir();

  if (platform === 'darwin') {
    // macOS
    locations.push(
      '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
      path.join(homeDir, 'Library/Application Support/Code/bin/code'),
    );
  } else if (platform === 'linux') {
    // Linux
    locations.push(
      '/usr/share/code/bin/code',
      '/snap/bin/code',
      path.join(homeDir, '.local/share/code/bin/code'),
    );
  } else if (platform === 'win32') {
    // Windows
    locations.push(
      path.join(
        process.env['ProgramFiles'] || 'C:\\Program Files',
        'Microsoft VS Code',
        'bin',
        'code.cmd',
      ),
      path.join(
        homeDir,
        'AppData',
        'Local',
        'Programs',
        'Microsoft VS Code',
        'bin',
        'code.cmd',
      ),
    );
  }

  for (const location of locations) {
    if (fs.existsSync(location)) {
      return location;
    }
  }

  return null;
}

async function resolveVsixSource(source: string): Promise<{
  vsixPath: string;
  cleanup?: () => Promise<void>;
}> {
  const trimmedSource = source.trim();
  if (!trimmedSource) {
    throw new Error('VSIX source is empty.');
  }

  if (/^https?:\/\//i.test(trimmedSource)) {
    const response = await fetch(trimmedSource);
    if (!response.ok) {
      throw new Error(
        `Failed to download VSIX from ${trimmedSource}: ${response.status} ${response.statusText}`,
      );
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const tempDir = await fs.promises.mkdtemp(
      path.join(os.tmpdir(), 'gusqwen-vsix-'),
    );
    const vsixPath = path.join(tempDir, 'gusqwen-vscode-ide-companion.vsix');
    await fs.promises.writeFile(vsixPath, buffer);
    return {
      vsixPath,
      cleanup: async () => {
        await fs.promises.rm(tempDir, { recursive: true, force: true });
      },
    };
  }

  throw new Error(`Unsupported VSIX source: ${trimmedSource}`);
}

class VsCodeInstaller implements IdeInstaller {
  private vsCodeCommand: Promise<string | null>;

  constructor(
    readonly ideInfo: IdeInfo,
    readonly platform = process.platform,
  ) {
    this.vsCodeCommand = findVsCodeCommand(platform);
  }

  async install(): Promise<InstallResult> {
    const commandPath = await this.vsCodeCommand;
    if (!commandPath) {
      return {
        success: false,
        message: `${this.ideInfo.displayName} CLI not found. Please ensure 'code' is in your system's PATH. For help, see https://code.visualstudio.com/docs/configure/command-line#_code-is-not-recognized-as-an-internal-or-external-command. You can also install the '${QWEN_CODE_COMPANION_EXTENSION_NAME}' extension manually from the VS Code marketplace.`,
      };
    }

    const isWindows = process.platform === 'win32';
    const vsixSource = getVsixUrl();
    let cleanupTemp: (() => Promise<void>) | undefined;
    let installArgs = [
      '--install-extension',
      'gusqwenlm.gusqwen-vscode-ide-companion',
      '--force',
    ];

    try {
      const resolved = await resolveVsixSource(vsixSource);
      cleanupTemp = resolved.cleanup;
      installArgs = ['--install-extension', resolved.vsixPath, '--force'];
    } catch (error) {
      return {
        success: false,
        message: `Failed to install ${this.ideInfo.displayName} companion extension from VSIX (${vsixSource}). ${String(error)}`,
      };
    }

    try {
      const result = child_process.spawnSync(
        isWindows ? `"${commandPath}"` : commandPath,
        installArgs,
        { stdio: 'pipe', shell: isWindows },
      );

      if (result.status !== 0) {
        throw new Error(
          `Failed to install extension: ${result.stderr?.toString()}`,
        );
      }

      return {
        success: true,
        message: `${this.ideInfo.displayName} companion extension was installed successfully.`,
      };
    } catch (_error) {
      return {
        success: false,
        message: `Failed to install ${this.ideInfo.displayName} companion extension. Please try installing '${QWEN_CODE_COMPANION_EXTENSION_NAME}' manually from the ${this.ideInfo.displayName} extension marketplace.`,
      };
    } finally {
      if (cleanupTemp) {
        await cleanupTemp();
      }
    }
  }
}

export function getIdeInstaller(
  ide: IdeInfo,
  platform = process.platform,
): IdeInstaller | null {
  switch (ide.name) {
    case IDE_DEFINITIONS.vscode.name:
    case IDE_DEFINITIONS.firebasestudio.name:
    case IDE_DEFINITIONS.vscodefork.name:
      return new VsCodeInstaller(ide, platform);
    default:
      return null;
  }
}

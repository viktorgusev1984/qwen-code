/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { FileSystemService } from '@psd-tech/gusqwen-core';
import type * as acp from '../acp.js';

/**
 * ACP client-based implementation of FileSystemService
 */
export class AcpFileSystemService implements FileSystemService {
  constructor(
    private readonly client: acp.Client,
    private readonly sessionId: string,
    private readonly capabilities: acp.FileSystemCapability,
    private readonly fallback: FileSystemService,
  ) {}

  async readTextFile(filePath: string): Promise<string> {
    if (!this.capabilities.readTextFile) {
      return this.fallback.readTextFile(filePath);
    }

    try {
      const response = await this.client.readTextFile({
        path: filePath,
        sessionId: this.sessionId,
        line: null,
        limit: null,
      });

      if (response.content.startsWith('ERROR: ENOENT:')) {
        // Treat ACP error strings as structured ENOENT errors without
        // assuming a specific platform format.
        const match = /^ERROR:\s*ENOENT:\s*(?<path>.*)$/i.exec(response.content);
        const err = new Error(response.content) as NodeJS.ErrnoException;
        err.code = 'ENOENT';
        err.errno = -2;
        const rawPath = match?.groups?.['path']?.trim();
        err['path'] = rawPath
          ? rawPath.replace(/^['"]|['"]$/g, '') || filePath
          : filePath;
        throw err;
      }

      return response.content;
    } catch (error) {
      throw this.normalizeAcpError(error, filePath);
    }
  }

  async writeTextFile(filePath: string, content: string): Promise<void> {
    if (!this.capabilities.writeTextFile) {
      return this.fallback.writeTextFile(filePath, content);
    }

    await this.client.writeTextFile({
      path: filePath,
      content,
      sessionId: this.sessionId,
    });
  }
  findFiles(fileName: string, searchPaths: readonly string[]): string[] {
    return this.fallback.findFiles(fileName, searchPaths);
  }

  private normalizeAcpError(
    error: unknown,
    filePath: string,
  ): NodeJS.ErrnoException {
    const message = this.stringifyAcpError(error);
    const err = new Error(message) as NodeJS.ErrnoException;
    if (message.toUpperCase().includes('ENOENT')) {
      err.code = 'ENOENT';
      err.errno = -2;
      err.path = filePath;
    }
    return err;
  }

  private stringifyAcpError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (error && typeof error === 'object') {
      const maybeMessage = (error as { message?: unknown }).message;
      if (typeof maybeMessage === 'string' && maybeMessage.length > 0) {
        return maybeMessage;
      }
      try {
        return JSON.stringify(error);
      } catch {
        return String(error);
      }
    }
    return String(error);
  }
}

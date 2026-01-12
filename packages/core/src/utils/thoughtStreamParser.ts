/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThoughtStreamParseResult = {
  thoughts: string[];
  visibleText: string;
};

const OPEN_TAG = '<think>';
const CLOSE_TAG = '</think>';

export class ThoughtStreamParser {
  private buffer = '';

  reset(): void {
    this.buffer = '';
  }

  parseChunk(text: string): ThoughtStreamParseResult {
    if (!text) {
      return { thoughts: [], visibleText: '' };
    }

    this.buffer += text;

    const thoughts: string[] = [];
    let visibleText = '';
    let cursor = 0;

    while (true) {
      const start = this.buffer.indexOf(OPEN_TAG, cursor);
      if (start === -1) {
        visibleText += this.buffer.slice(cursor);
        this.buffer = '';
        break;
      }

      const end = this.buffer.indexOf(CLOSE_TAG, start + OPEN_TAG.length);
      if (end === -1) {
        visibleText += this.buffer.slice(cursor, start);
        this.buffer = this.buffer.slice(start);
        break;
      }

      visibleText += this.buffer.slice(cursor, start);
      const rawThought = this.buffer.slice(start + OPEN_TAG.length, end);
      thoughts.push(rawThought);
      cursor = end + CLOSE_TAG.length;
    }

    return { thoughts, visibleText };
  }

  flush(): ThoughtStreamParseResult {
    if (!this.buffer) {
      return { thoughts: [], visibleText: '' };
    }

    const visibleText = this.buffer;
    this.buffer = '';
    return { thoughts: [], visibleText };
  }
}

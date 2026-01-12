<div align="center">

[![npm version](https://img.shields.io/npm/v/@psd-tech/gusqwen.svg)](https://www.npmjs.com/package/@psd-tech/gusqwen)
[![License](https://img.shields.io/github/license/GusQwen/gusqwen.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Downloads](https://img.shields.io/npm/dm/@gusqwen/gusqwen.svg)](https://www.npmjs.com/package/@gusqwen/gusqwen)

**An open-source AI agent that lives in your terminal.**

<a href="https://gusqwenlm.github.io/gusqwen-docs/zh/users/overview">中文</a> |
<a href="https://gusqwenlm.github.io/gusqwen-docs/de/users/overview">Deutsch</a> |
<a href="https://gusqwenlm.github.io/gusqwen-docs/fr/users/overview">français</a> |
<a href="https://gusqwenlm.github.io/gusqwen-docs/ja/users/overview">日本語</a> |
<a href="https://gusqwenlm.github.io/gusqwen-docs/ru/users/overview">Русский</a> |
<a href="https://gusqwenlm.github.io/gusqwen-docs/pt-BR/users/overview">Português (Brasil)</a>

</div>

Gus Qwen is an open-source AI agent for the terminal, optimized for [Qwen3-Coder](https://github.com/GusQwen/Qwen3-Coder). It helps you understand large codebases, automate tedious work, and ship faster.

![](https://gw.alicdn.com/imgextra/i1/O1CN01D2DviS1wwtEtMwIzJ_!!6000000006373-2-tps-1600-900.png)

## Why Gus Qwen?

- **OpenAI-compatible, OAuth free tier**: use an OpenAI-compatible API, or sign in with Gus Qwen OAuth to get 2,000 free requests/day.
- **Open-source, co-evolving**: both the framework and the Qwen3-Coder model are open-source—and they ship and evolve together.
- **Agentic workflow, feature-rich**: rich built-in tools (Skills, SubAgents, Plan Mode) for a full agentic workflow and a Claude Code-like experience.
- **Terminal-first, IDE-friendly**: built for developers who live in the command line, with optional integration for VS Code and Zed.

## Installation

#### Prerequisites

```bash
# Node.js 20+
curl -qL https://www.npmjs.com/install.sh | sh
```

#### NPM (recommended)

```bash
npm install -g @psd-tech/gusqwen@latest
```

#### Установка плагинов вручную без команды /ide install

##### Intellij

1. Скачать последний релиз плагина  
   👉 [**Скачать releas latest**](https://s3-msk.tinkoff.ru/psd-tech-gusqwen/release/jetbrains/gusqwen-intellij-ide-companion-latest-since-233.zip)

   👉 [**Скачать последнюю не релизную сборку**](https://s3-msk.tinkoff.ru/psd-tech-gusqwen/jetbrains/gusqwen-intellij-ide-companion-latest.zip)

2. В IntelliJ IDEA:  
   **File → Settings → Plugins → ⚙️ (Install plugin from disk)**  
   Выберите скачанный `.zip` файл.

3. Перезапустите IDE.

##### VSCode

1. Скачать последний релиз плагина  
   👉 [**Скачать releas latest**](https://s3-msk.tinkoff.ru/psd-tech-gusqwen/vscode/gusqwen-vscode-ide-companion-0.3.15.vsix)

2. В VSCode:  
   **View → Extensions → ⚙️ (Install from VSIX)**

## Quick Start

```bash
# Start Gus Qwen (interactive)
gusqwen

# Then, in the session:
/help
/auth
```

On first use, you'll be prompted to sign in. You can run `/auth` anytime to switch authentication methods.

Example prompts:

```text
What does this project do?
Explain the codebase structure.
Help me refactor this function.
Generate unit tests for this module.
```

<details>
<summary>Click to watch a demo video</summary>

<video src="https://cloud.video.taobao.com/vod/HLfyppnCHplRV9Qhz2xSqeazHeRzYtG-EYJnHAqtzkQ.mp4" controls>
Your browser does not support the video tag.
</video>

</details>

## Authentication

Gus Qwen supports two authentication methods:

- **Gus Qwen OAuth (recommended & free)**: sign in with your `gusqwen.ai` account in a browser.
- **OpenAI-compatible API**: use `OPENAI_API_KEY` (and optionally a custom base URL / model).

#### Gus Qwen OAuth (recommended)

Start `gusqwen`, then run:

```
Spirit->tenant->llm->accaunts->default->generate key
```

Choose **Gus Qwen OAuth** and complete the browser flow. Your credentials are cached locally so you usually won't need to log in again.

#### OpenAI-compatible API (API key)

Environment variables (recommended for CI / headless environments):

```bash
export OPENAI_API_KEY="your-api-key-here"
export OPENAI_BASE_URL="https://api.openai.com/v1"  # optional
export OPENAI_MODEL="gpt-4o"                        # optional
```

For details (including `.qwen/.env` loading and security notes), see the [authentication guide](https://gusqwenlm.github.io/gusqwen-docs/en/users/configuration/auth/).

## Usage

As an open-source terminal agent, you can use Gus Qwen in four primary ways:

1. Interactive mode (terminal UI)
2. Headless mode (scripts, CI)
3. IDE integration (VS Code, Zed)
4. TypeScript SDK

#### Interactive mode

```bash
cd your-project/
gusqwen
```

Run `gusqwen` in your project folder to launch the interactive terminal UI. Use `@` to reference local files (for example `@src/main.ts`).

#### Headless mode

```bash
cd your-project/
gusqwen -p "your question"
```

Use `-p` to run Gus Qwen without the interactive UI—ideal for scripts, automation, and CI/CD. Learn more: [Headless mode](https://gusqwenlm.github.io/gusqwen-docs/en/users/features/headless).

#### IDE integration

Use Gus Qwen inside your editor (VS Code, Zed and Intellij):

- [Use in VS Code](https://gusqwenlm.github.io/gusqwen-docs/en/users/integration-vscode/)
- [Use in Intellijide](...)
- [Use in Zed](https://gusqwenlm.github.io/gusqwen-docs/en/users/integration-zed/)

#### TypeScript SDK

Build on top of Gus Qwen with the TypeScript SDK:

- [Use the Gus Qwen SDK](./packages/sdk-typescript/README.md)

## Commands & Shortcuts

### Session Commands

- `/help` - Display available commands
- `/clear` - Clear conversation history
- `/compress` - Compress history to save tokens
- `/stats` - Show current session information
- `/bug` - Submit a bug report
- `/exit` or `/quit` - Exit Gus Qwen

### Keyboard Shortcuts

- `Ctrl+C` - Cancel current operation
- `Ctrl+D` - Exit (on empty line)
- `Up/Down` - Navigate command history

> Learn more about [Commands](https://gusqwenlm.github.io/gusqwen-docs/en/users/features/commands/)
>
> **Tip**: In YOLO mode (`--yolo`), vision switching happens automatically without prompts when images are detected. Learn more about [Approval Mode](https://gusqwenlm.github.io/gusqwen-docs/en/users/features/approval-mode/)

## Configuration

Gus Qwen can be configured via `settings.json`, environment variables, and CLI flags.

- **User settings**: `~/.qwen/settings.json`
- **Project settings**: `.qwen/settings.json`

See [settings](https://gusqwenlm.github.io/gusqwen-docs/en/users/configuration/settings/) for available options and precedence.

## Benchmark Results

### Terminal-Bench Performance

| Agent    | Model              | Accuracy |
| -------- | ------------------ | -------- |
| Gus Qwen | Qwen3-Coder-480A35 | 37.5%    |
| Gus Qwen | Qwen3-Coder-30BA3B | 31.3%    |

## Ecosystem

Looking for a graphical interface?

- [**Gemini CLI Desktop**](https://github.com/Piebald-AI/gemini-cli-desktop) A cross-platform desktop/web/mobile UI for Gus Qwen

## Troubleshooting

If you encounter issues, check the [troubleshooting guide](https://gusqwenlm.github.io/gusqwen-docs/en/users/support/troubleshooting/).

To report a bug from within the CLI, run `/bug` and include a short title and repro steps.

## Acknowledgments

This project is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). We acknowledge and appreciate the excellent work of the Gemini CLI team. Our main contribution focuses on parser-level adaptations to better support Qwen-Coder models.

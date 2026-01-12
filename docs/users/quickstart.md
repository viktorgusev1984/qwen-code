# Quickstart

> 👏 Welcome to Gus Qwen!

This quickstart guide will have you using AI-powered coding assistance in just a few minutes. By the end, you'll understand how to use Gus Qwen for common development tasks.

## Before you begin

Make sure you have:

- A **terminal** or command prompt open
- A code project to work with
- A [Gus Qwen](https://chat.gusqwen.ai/auth?mode=register) account

## Step 1: Install Gus Qwen

To install Gus Qwen, use one of the following methods:

### NPM (recommended)

Requires [Node.js 20+](https://nodejs.org/download), you can use `node -v` check the version. If it's not installed, use the following command to install it.

If you have [Node.js or newer installed](https://nodejs.org/en/download/):

```sh
npm install -g @psd-tech/gusqwen@latest
```

### Homebrew (macOS, Linux)

```sh
brew install gusqwen
```

## Step 2: Log in to your account

Gus Qwen requires an account to use. When you start an interactive session with the `qwen` command, you'll need to log in:

```bash
# You'll be prompted to log in on first use
qwen
```

```bash
# Follow the prompts to log in with your account
/auth
```

Select `Gus Qwen OAuth`, log in to your account and follow the prompts to confirm. Once logged in, your credentials are stored and you won't need to log in again.

> [!note]
>
> When you first authenticate Gus Qwen with your Qwen account, a workspace called ".qwen" is automatically created for you. This workspace provides centralized cost tracking and management for all Gus Qwen usage in your organization.

> [!tip]
>
> If you need to log in again or switch accounts, use the `/auth` command within Gus Qwen.

## Step 3: Start your first session

Open your terminal in any project directory and start Gus Qwen:

```bash
# optiona
cd /path/to/your/project
# start qwen
qwen
```

You'll see the Gus Qwen welcome screen with your session information, recent conversations, and latest updates. Type `/help` for available commands.

## Chat with Gus Qwen

### Ask your first question

Gus Qwen will analyze your files and provide a summary. You can also ask more specific questions:

```
explain the folder structure
```

You can also ask Gus Qwen about its own capabilities:

```
what can Gus Qwen do?
```

> [!note]
>
> Gus Qwen reads your files as needed - you don't have to manually add context. Gus Qwen also has access to its own documentation and can answer questions about its features and capabilities.

### Make your first code change

Now let's make Gus Qwen do some actual coding. Try a simple task:

```
add a hello world function to the main file
```

Gus Qwen will:

1. Find the appropriate file
2. Show you the proposed changes
3. Ask for your approval
4. Make the edit

> [!note]
>
> Gus Qwen always asks for permission before modifying files. You can approve individual changes or enable "Accept all" mode for a session.

### Use Git with Gus Qwen

Gus Qwen makes Git operations conversational:

```
what files have I changed?
```

```
commit my changes with a descriptive message
```

You can also prompt for more complex Git operations:

```
create a new branch called feature/quickstart
```

```
show me the last 5 commits
```

```
help me resolve merge conflicts
```

### Fix a bug or add a feature

Gus Qwen is proficient at debugging and feature implementation.

Describe what you want in natural language:

```
add input validation to the user registration form
```

Or fix existing issues:

```
there's a bug where users can submit empty forms - fix it
```

Gus Qwen will:

- Locate the relevant code
- Understand the context
- Implement a solution
- Run tests if available

### Test out other common workflows

There are a number of ways to work with Claude:

**Refactor code**

```
refactor the authentication module to use async/await instead of callbacks
```

**Write tests**

```
write unit tests for the calculator functions
```

**Update documentation**

```
update the README with installation instructions
```

**Code review**

```
review my changes and suggest improvements
```

> [!tip]
>
> **Remember**: Gus Qwen is your AI pair programmer. Talk to it like you would a helpful colleague - describe what you want to achieve, and it will help you get there.

## Essential commands

Here are the most important commands for daily use:

| Command               | What it does                                     | Example                       |
| --------------------- | ------------------------------------------------ | ----------------------------- |
| `qwen`                | start Gus Qwen                                  | `qwen`                        |
| `/auth`               | Change authentication method                     | `/auth`                       |
| `/help`               | Display help information for available commands  | `/help` or `/?`               |
| `/compress`           | Replace chat history with summary to save Tokens | `/compress`                   |
| `/clear`              | Clear terminal screen content                    | `/clear` (shortcut: `Ctrl+L`) |
| `/theme`              | Change Gus Qwen visual theme                    | `/theme`                      |
| `/language`           | View or change language settings                 | `/language`                   |
| → `ui [language]`     | Set UI interface language                        | `/language ui zh-CN`          |
| → `output [language]` | Set LLM output language                          | `/language output Chinese`    |
| `/quit`               | Exit Gus Qwen immediately                       | `/quit` or `/exit`            |

See the [CLI reference](./features/commands) for a complete list of commands.

## Pro tips for beginners

**Be specific with your requests**

- Instead of: "fix the bug"
- Try: "fix the login bug where users see a blank screen after entering wrong credentials"

**Use step-by-step instructions**

- Break complex tasks into steps:

```
1. create a new database table for user profiles
2. create an API endpoint to get and update user profiles
3. build a webpage that allows users to see and edit their information
```

**Let Gus Qwen explore first**

- Before making changes, let Gus Qwen understand your code:

```
analyze the database schema
```

```
build a dashboard showing products that are most frequently returned by our UK customers
```

**Save time with shortcuts**

- Press `?` to see all available keyboard shortcuts
- Use Tab for command completion
- Press ↑ for command history
- Type `/` to see all slash commands

## Getting help

- **In Gus Qwen**: Type `/help` or ask "how do I..."
- **Documentation**: You're here! Browse other guides
- **Community**: Join our [GitHub Discussion](https://github.com/GusQwen/gusqwen/discussions) for tips and support

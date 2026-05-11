🌐 [Português (Brasil)](README.pt_BR.md) | [Español](README.es.md)

# 🎮 Mona Mayhem

**VS Code & GitHub Copilot CLI Workshop** — Build a GitHub Contribution Battle Arena

A retro arcade workshop where you turn GitHub contribution graphs into a head-to-head battle experience with Astro and GitHub Copilot.

**Start here if you want to:**

- ship something playful instead of another TODO app
- practice real Copilot workflows in **VS Code** or the **CLI**
- learn by building a polished app from a small, focused starter

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*What you'll build by the end of the workshop*

## Why Mona Mayhem?

- **Fast to start** — the repo is intentionally small, so you can get to building quickly
- **Hands-on Copilot practice** — use prompts, plans, agentic edits, reviews, and iteration loops
- **Fun end result** — compare two GitHub users in a retro-styled contribution battle arena
- **Built with modern tools** — Astro, TypeScript, and a runtime API route for contribution data

## What you'll make

By the end of the workshop, you'll have:

- a landing page for your GitHub battle arena
- an API route that fetches GitHub contribution data
- a themed experience you can keep extending after the workshop
- a repeatable workflow for building with GitHub Copilot

## 📚 Workshop

Choose the track that matches how you like to build:

- **VS Code track** — Chat, Plan Mode, Agent Mode, background agents, and editor-native review loops
- **CLI track** — `copilot`, `@file` context, `/plan`, autonomous edits, `/fleet`, `/delegate`, and `/review`

| Part | Title | Copilot Focus |
|------|-------|---------------|
| [00](workshop/00-overview.md) | Overview | Track selection and learning goals |
| [01](workshop/01-setup.md) | Setup & Context Engineering | Instructions, permissions, and environment setup |
| [02](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Planning the API and page architecture |
| [03](workshop/03-agent-mode.md) | Build the Game | Agentic implementation and iteration |
| [04](workshop/04-design-vibes.md) | Design-First Theming | Visual design planning and implementation |
| [05](workshop/05-polish.md) | Polish & Parallel Work | Parallelism, reviews, and quality passes |
| [06](workshop/06-bonus.md) | Bonus & Extensions | Open-ended feature ideas and extra Copilot experiments |

## 🚀 Quick Start

1. **Create your own copy** of the repo:
   - click **Use this template**, or
   - fork the repository
2. **Pick your workflow**:
   - **VS Code:** clone your repo and open it in VS Code
   - **GitHub Copilot CLI:** clone your repo locally, install `copilot`, and work from your terminal
3. **Start the workshop** with the [overview guide](workshop/00-overview.md)

## At a glance

| You want to... | Start here |
|---|---|
| Understand the goal and pick a track | [Workshop overview](workshop/00-overview.md) |
| Set up your tools and permissions | [Setup & Context Engineering](workshop/01-setup.md) |
| Jump into planning and scaffolding | [Plan & Scaffold](workshop/02-plan-and-scaffold.md) |

## Prerequisites

### Shared

- GitHub Copilot (Pro, Business, or Enterprise)
- Git
- Node.js

### VS Code track

- VS Code v1.107+
- GitHub Copilot extension signed in

### CLI track

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ if you plan to install the CLI via `npm install -g @github/copilot`
- Or Homebrew / WinGet if you prefer a native package manager install

## Technology Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Runtime**: Node.js with [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) adapter
- **Font**: Press Start 2P (retro gaming font)
- **API**: GitHub's contribution graph API

## License

MIT

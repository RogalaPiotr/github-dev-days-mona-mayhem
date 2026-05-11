🌐 [Português (Brasil)](README.pt_BR.md) | [Español](README.es.md)

# 🎮 Mona Mayhem

> **VS Code & GitHub Copilot CLI Workshop**  
> Build a retro GitHub Contribution Battle Arena with Astro, Copilot, and a little arcade chaos.

[🚀 Start the workshop](workshop/00-overview.md) · [🌐 Open the docs site](https://copilot-dev-days.github.io/mona-mayhem/) · [🧱 Explore the starter app](src/pages/index.astro)

Mona Mayhem is the starter project for a hands-on GitHub Copilot workshop. You begin with a lightweight Astro app and turn it into a head-to-head contribution showdown between two GitHub users using planning, agentic edits, design iteration, and polish passes.

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*What you'll build by the end of the workshop*

## ✨ Why this repo is fun to explore

- **Start fast** with a minimal Astro codebase instead of a blank project
- **Practice real Copilot workflows** across both VS Code and the GitHub Copilot CLI
- **Ship something visual** with retro arcade styling, contribution data, and playful matchups
- **Learn by layering** from setup and planning to implementation, theming, and final polish

## 🕹️ Pick your player

The workshop supports two tracks, so you can follow the workflow that feels most natural:

| Track | Best for | You'll practice |
|------|----------|-----------------|
| **VS Code** | Developers who want an editor-first experience | Chat, Plan Mode, Agent Mode, background agents, and editor-native review loops |
| **CLI** | Developers who prefer building from the terminal | `copilot`, `@file` context, `/plan`, autonomous edits, `/fleet`, `/delegate`, and `/review` |

## 📚 Workshop

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

1. **Create your own repo** by either:
   - clicking **Use this template**, or
   - forking this repository.
2. **Choose your workshop path**:
   - **VS Code:** clone your repo and open it in VS Code.
   - **GitHub Copilot CLI:** clone your repo locally, install `copilot`, and work from your terminal.
3. **Start with the guide:** [workshop/00-overview.md](workshop/00-overview.md)
4. **Build as you go** through each chapter until your battle arena is complete.

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

## 🏁 End result

By the time you finish, you'll have:

- a GitHub contribution face-off experience built with Astro
- a stronger feel for Copilot planning and implementation workflows
- a polished project you can keep extending after the workshop

## License

MIT

# 🧩 Sudoku Lite

A modern, feature-rich Sudoku game built with React 19 and Vite — play, track your scores, and compete on the leaderboard.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Zustand](https://img.shields.io/badge/Zustand-5.x-orange)](https://zustand.docs.pmnd.rs)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [How to Play](#how-to-play)
- [Scoring System](#scoring-system)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)
- [Privacy Policy](#privacy-policy)
- [License](#license)
- [Author](#author)

## Overview

Sudoku Lite is a fully client-side Sudoku game that runs entirely in your browser. It features procedurally generated puzzles with guaranteed solutions, four difficulty levels, a local leaderboard, and automatic game saving — all without any server or backend.

Key highlights:

- 🎮 **Four difficulty levels** — Easy, Medium, Hard, Expert
- 💾 **Auto-save** — game state is saved automatically with debouncing
- 🏆 **Local leaderboard** — top 100 scores stored in localStorage
- ⏸️ **Pause & resume** — stop and continue your game anytime
- 📱 **Responsive** — works seamlessly on desktop and mobile

## Features

| Feature                    | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| **Puzzle Generation**      | Backtracking algorithm generates valid, solvable Sudoku puzzles |
| **Real-time Validation**   | Invalid placements are tracked as mistakes instantly            |
| **Timer & Move Counter**   | Track your performance during gameplay                          |
| **Score Calculation**      | Final score based on time, moves, and mistakes                  |
| **Auto-save**              | Game state saved on every move with 500ms debounce              |
| **Resume on Refresh**      | Continue your game after page reload or browser close           |
| **Leaderboard**            | Top 100 scores with smart ranking (newest first for ties)       |
| **Pause Functionality**    | Pause and resume with board hidden                              |
| **Game Completion Dialog** | Modal overlay via React Portal                                  |
| **Form Validation**        | Player name validation with react-hook-form                     |
| **State Management**       | Zustand stores with automatic localStorage persistence          |
| **Optimized Rendering**    | React.memo for frequently re-rendered components                |

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AcceleratorMX/sudoku-lite.git
cd sudoku-lite

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script              | Command                   | Description                                      |
| ------------------- | ------------------------- | ------------------------------------------------ |
| **Dev**             | `npm run dev`             | Start Vite development server with HMR           |
| **Build**           | `npm run build`           | Create production build in `dist/`               |
| **Preview**         | `npm run preview`         | Preview production build locally                 |
| **Lint**            | `npm run lint`            | Run ESLint on all source files                   |
| **Docs**            | `npm run docs`            | Generate JSDoc API documentation in `docs/`      |
| **Storybook**       | `npm run storybook`       | Launch Storybook component explorer on port 6006 |
| **Build Storybook** | `npm run build-storybook` | Build static Storybook for deployment            |

## How to Play

1. Enter your player name on the start screen
2. Select a difficulty level (Easy / Medium / Hard / Expert)
3. Click **Start Game** to begin
4. Fill cells with numbers **1–9** so that each row, column, and 3×3 box contains no duplicates
5. Track your moves, mistakes, and time in real-time
6. Complete the puzzle to see your final score and grade
7. View your position on the leaderboard

### Difficulty Levels

| Level  | Pre-filled Cells | Description             |
| ------ | ---------------- | ----------------------- |
| Easy   | 40               | Great for beginners     |
| Medium | 30               | A moderate challenge    |
| Hard   | 25               | For experienced players |
| Expert | 20               | The ultimate test       |

## Scoring System

**Starting score: 1000 points**

| Penalty     | Rule                                            |
| ----------- | ----------------------------------------------- |
| ⏱️ Time     | −1 point for every second over 3 minutes (180s) |
| 🎮 Moves    | −2 points for every move over 81                |
| ❌ Mistakes | −50 points per mistake                          |

**Grade scale:**

| Score   | Grade        |
| ------- | ------------ |
| 900+    | 🏆 Excellent |
| 700–899 | ⭐ Great     |
| 500–699 | 👍 Good      |
| < 500   | 💪 Try Again |

## Project Structure

```
sudoku-lite/
├── src/
│   ├── components/         # UI Components
│   │   ├── common/         # Button, Portal, CookieConsent
│   │   ├── forms/          # StartForm, Difficulty
│   │   ├── game/           # Cell, Grid, SudokuGame, GameHeader, etc.
│   │   └── leaderboard/    # Player, ScoresList
│   ├── pages/              # Route pages (Start, Game, Scores)
│   ├── routes/             # React Router configuration
│   ├── stores/             # Zustand state stores
│   ├── hooks/              # Custom hooks (useTimer, useSudokuBoard, etc.)
│   ├── services/           # Business logic
│   │   ├── storage/        # StorageService, GameStorageService
│   │   └── sudoku/         # SudokuGenerator (backtracking solver)
│   ├── constants/          # App configuration and magic values
│   ├── utils/              # Utility functions
│   └── css/                # CSS Modules organized by component
├── docs/                   # Generated JSDoc documentation
├── .storybook/             # Storybook configuration
├── PRIVACY_POLICY.md       # Privacy policy
├── LICENSE                 # MIT License
└── license-report.txt      # Dependency license audit report
```

## Tech Stack

| Technology                                                | Purpose                                              |
| --------------------------------------------------------- | ---------------------------------------------------- |
| [React 19](https://react.dev)                             | UI library with React Compiler                       |
| [Vite 7](https://vite.dev)                                | Build tool and dev server                            |
| [Zustand 5](https://zustand.docs.pmnd.rs)                 | Lightweight state management with persist middleware |
| [React Router DOM 7](https://reactrouter.com)             | Client-side routing                                  |
| [react-hook-form 7](https://react-hook-form.com)          | Form validation                                      |
| [styled-components 6](https://styled-components.com)      | CSS-in-JS (selective usage)                          |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styling                             |
| [ESLint 9](https://eslint.org)                            | Code linting (flat config)                           |
| [JSDoc](https://jsdoc.app)                                | API documentation generator                          |
| [Storybook 10](https://storybook.js.org)                  | Component explorer and documentation                 |

## Documentation

- **API Documentation (JSDoc):** Generated in the [`docs/api/`](./docs/api/index.html) directory. Run `npm run docs` to regenerate.
- **Component Documentation (Storybook):** Run `npm run storybook` to explore interactive component docs for `Button` and `Cell`.
- **Privacy Policy:** See [`PRIVACY_POLICY.md`](./PRIVACY_POLICY.md)
- **License Report:** See [`license-report.txt`](./license-report.txt) — generated by [license-checker](https://www.npmjs.com/package/license-checker)

## Privacy Policy

Sudoku Lite operates entirely on the client side. No data is sent to any server. All game data (player name, progress, settings, scores) is stored locally in your browser's `localStorage`. See the full [Privacy Policy](./PRIVACY_POLICY.md) for details.

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

**Oleksandr Karpinskyi**

- GitHub: [@AcceleratorMX](https://github.com/AcceleratorMX)

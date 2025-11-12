# 🧩 Sudoku Lite

A simple web-based Sudoku game built with React and Vite.

## 🚀 How to Run the Application

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

After running, open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎮 How to Play

1. Enter your name on the start page
2. Select difficulty level (Easy, Medium, Hard, Expert)
3. Click "Start Game" to begin
4. Fill the cells with numbers from 1 to 9
5. Each row, column, and 3×3 subgrid must contain digits 1-9 without repetition
6. Track your moves, mistakes, and time
7. Complete the game and view your results
8. Your score is saved automatically and compared with other players

## 🎯 Scoring System

Your final score is calculated based on the following formula:

### Starting Score: 1000 points

### Penalties

- ⏱️ **Time Penalty**: -1 point for every second over 3 minutes (180 seconds)
- 🎮 **Moves Penalty**: -2 points for every move over 81 moves
- ❌ **Mistakes Penalty**: -50 points for each mistake

### Example

- Time: 4 minutes (240 seconds) → Penalty: -60 points
- Moves: 90 → Penalty: -18 points
- Mistakes: 3 → Penalty: -150 points
- **Final Score**: 1000 - 60 - 18 - 150 = **772 points**

### Grade System

- 900+ points: **Excellent!** 🏆
- 700-899 points: **Great!** ⭐
- 500-699 points: **Good!** 👍
- Below 500 points: **Try Again!** 💪

## 🎲 Difficulty Levels

- **Easy**: 40-45 pre-filled cells
- **Medium**: 30-35 pre-filled cells
- **Hard**: 25-28 pre-filled cells
- **Expert**: 20-22 pre-filled cells

## ✨ Features

- **Difficulty levels** - Choose from Easy, Medium, Hard, or Expert
- **Valid sudoku generation** - Every puzzle has a guaranteed solution with backtracking algorithm
- **Real-time validation** - Invalid placements are tracked as mistakes
- **Timer** - Track how long it takes to complete the puzzle
- **Move counter** - Keep track of your total moves
- **Score calculation** - Based on time, moves, and mistakes
- **Local leaderboard** - Top scores saved in browser localStorage
- **Pause functionality** - Pause and resume the game anytime
- **Game completion dialog** - Modal dialog using React Portal
- **Form validation** - Using react-hook-form for player settings
- **Auto-save** - Game state automatically saved on every move with debouncing
- **Resume on refresh** - Continue your game after page reload
- **Responsive design** - Works on desktop and mobile devices
- **Optimized performance** - Using React.memo for frequently re-rendered components

## 📁 Project Structure

```text
src/
├── components/             # Reusable UI components
│   ├── common/            # Shared components (Button, Portal)
│   ├── forms/             # Form components (StartForm, Difficulty)
│   ├── leaderboard/       # Leaderboard components (Player, ScoresList)
│   └── game/              # Game components (Cell, Grid, SudokuGame, GameHeader, GameStats, GameControls, PauseOverlay, GameCompletionDialog)
├── pages/                 # Page components (Start, Game, Scores)
├── routes/                # Routing configuration
├── hooks/                 # Custom React hooks
├── services/              # Business logic services
│   ├── storage/           # LocalStorage operations (StorageService, GameStorageService)
│   └── sudoku/            # Sudoku generation and solving algorithms
├── constants/             # App constants and configuration
├── utils/                 # Utility functions
├── css/                   # Stylesheets
│   ├── components/        # Component styles (organized by component structure)
│   │   ├── common/        # Common component styles
│   │   ├── forms/         # Form component styles
│   │   ├── game/          # Game component styles
│   │   └── leaderboard/   # Leaderboard component styles
│   └── pages/             # Page styles
└── assets/                # Static assets
```

## 🎯 Custom Hooks

The application uses custom hooks to keep components clean and separate business logic:

- **`useTimer`** - Manages game timer with start, pause, reset, and initial time support
- **`useSudokuBoard`** - Handles valid sudoku generation, validation, cell updates, and state restoration
- **`useGameStats`** - Tracks moves, mistakes, calculates final score, and supports state restoration
- **`useLocalStorage`** - Manages persistent storage with get/set/remove operations
- **`useGameState`** - Manages complete app state (current page, player data, game progress)
- **`useGamePersistence`** - Handles game state persistence and auto-save with debouncing
- **`usePlayerSession`** - Manages player session (ID generation, name storage, session tracking)
- **`useScoreManager`** - Score tracking, saving, and leaderboard management

## 🏗️ Architecture

The project follows **SOLID principles** and **separation of concerns**:

- **Services Layer** - Business logic separated from UI (SudokuGenerator, StorageService, GameStorageService)
- **Custom Hooks** - Reusable stateful logic
- **Component Organization** - Components grouped by feature (common, forms, leaderboard, game)
- **Barrel Exports** - Clean import paths through index.js files
- **Performance Optimization** - React.memo applied to frequently re-rendered components (Cell, Player, GameStats, PauseOverlay)
- **Utility Functions** - Pure functions for calculations and formatting
- **CSS Modules** - Scoped styling matching component structure

## 🛠️ Technologies

- **React** - UI library
- **react-hook-form** - Form validation and management
- **prop-types** - Runtime type checking for React props
- **Vite** - Build tool and dev server
- **React Portal** - For modal dialogs
- **CSS Custom Properties** - For theming and styling
- **ESLint** - Code quality and linting
- **localStorage API** - For persisting game results, settings, and progress

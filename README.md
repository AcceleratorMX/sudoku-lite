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

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Play

1. Enter your name on the start page
2. Click "Game Start" to begin the game
3. Fill the cells with numbers from 1 to 9
4. Each row, column, and 3×3 subgrid must contain digits 1-9 without repetition
5. Track your moves, mistakes, and time
6. Complete the game and view your results
7. Your score is saved automatically and compared with other players

## ✨ Features

- **Real-time validation** - Invalid placements are tracked as mistakes
- **Timer** - Track how long it takes to complete the puzzle
- **Move counter** - Keep track of your total moves
- **Score calculation** - Based on time, moves, and mistakes
- **Local leaderboard** - Top scores saved in browser localStorage
- **Pause functionality** - Pause and resume the game anytime
- **Responsive design** - Works on desktop and mobile devices

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── game/        # Game-specific components (Cell, Grid, SudokuGame)
│   └── ui/          # UI components (Button, Player, Forms, Lists)
├── pages/           # Page components (Start, Game, Scores)
├── hooks/           # Custom React hooks
│   ├── useTimer.js          # Timer management
│   ├── useSudokuBoard.js    # Board state and validation
│   ├── useGameStats.js      # Game statistics tracking
│   └── useLocalStorage.js   # localStorage integration
├── constants/       # App constants
├── utils/          # Utility functions
└── css/            # Stylesheets
```

## 🎯 Custom Hooks

The application uses custom hooks to keep components clean and separate business logic:

- **`useTimer`** - Manages game timer with start, pause, and reset
- **`useSudokuBoard`** - Handles board generation, validation, and updates
- **`useGameStats`** - Tracks moves, mistakes, and calculates final score
- **`useLocalStorage`** - Manages persistent storage of game results

## 🛠️ Technologies

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS Custom Properties** - For theming and styling
- **ESLint** - Code quality and linting
- **localStorage API** - For persisting game results

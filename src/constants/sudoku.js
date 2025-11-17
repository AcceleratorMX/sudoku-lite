/**
 * Sudoku Game Constants
 * 
 * Core constants for Sudoku game rules and grid structure
 */

export const SUDOKU = {
  GRID_SIZE: 9,
  SUBGRID_SIZE: 3,
  MIN_VALUE: 1,
  MAX_VALUE: 9,
  EMPTY_CELL: ''
};

/**
 * Difficulty Levels
 * 
 * Available difficulty levels for the game
 */
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  EXPERT: 'expert'
};

/**
 * Difficulty Settings
 * 
 * Configuration for each difficulty level including:
 * - label: Display name
 * - filledCells: Number of pre-filled cells
 * - description: User-friendly description
 */
export const DIFFICULTY_SETTINGS = {
  [DIFFICULTY_LEVELS.EASY]: {
    label: 'Easy',
    filledCells: 40,
    description: '40 cells filled'
  },
  [DIFFICULTY_LEVELS.MEDIUM]: {
    label: 'Medium',
    filledCells: 30,
    description: '30 cells filled'
  },
  [DIFFICULTY_LEVELS.HARD]: {
    label: 'Hard',
    filledCells: 25,
    description: '25 cells filled'
  },
  [DIFFICULTY_LEVELS.EXPERT]: {
    label: 'Expert',
    filledCells: 20,
    description: '20 cells filled'
  }
};

export const APP_STATES = {
    START: 'start',
    GAME: 'game',
    SCORES: 'scores'
};

export const NAME_VALIDATION = {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 16
};

export const SUDOKU = {
    GRID_SIZE: 9,
    SUBGRID_SIZE: 3,
    MIN_VALUE: 1,
    MAX_VALUE: 9,
    EMPTY_CELL: ''
};

export const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert'
};

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

export const GAME_SETTINGS_KEY = 'sudoku-game-settings';

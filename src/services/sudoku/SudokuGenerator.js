import { SUDOKU, DIFFICULTY_SETTINGS } from "../../constants";

/**
 * SudokuGenerator - Service for generating Sudoku puzzles
 * 
 * This service handles all the logic for creating valid Sudoku boards
 * using backtracking algorithm and randomization.
 * 
 * @class SudokuGenerator
 */

/**
 * Shuffle an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Check if a number can be validly placed at a position in the board
 * 
 * Validates against:
 * - Row constraint (no duplicate in same row)
 * - Column constraint (no duplicate in same column)  
 * - 3x3 subgrid constraint (no duplicate in same subgrid)
 * 
 * @param {number[][]} board - 2D array representing the board
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @param {number} num - Number to place (1-9)
 * @returns {boolean} True if placement is valid
 */
function isValidPlacement(board, row, col, num) {
  // Check row constraint
  for (let c = 0; c < SUDOKU.GRID_SIZE; c++) {
    if (board[row][c] === num) return false;
  }

  // Check column constraint
  for (let r = 0; r < SUDOKU.GRID_SIZE; r++) {
    if (board[r][col] === num) return false;
  }

  // Check 3x3 subgrid constraint
  const startRow = Math.floor(row / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;
  const startCol = Math.floor(col / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;

  for (let r = startRow; r < startRow + SUDOKU.SUBGRID_SIZE; r++) {
    for (let c = startCol; c < startCol + SUDOKU.SUBGRID_SIZE; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
}

/**
 * Fill the board using backtracking algorithm
 * 
 * This recursive function fills an empty board with valid numbers
 * using backtracking when it hits a dead end.
 * 
 * @param {number[][]} board - 2D array to fill (modified in place)
 * @returns {boolean} True if board was successfully filled
 */
function fillBoard(board) {
  for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
    for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);

        for (const num of numbers) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;

            if (fillBoard(board)) {
              return true;
            }

            // Backtrack
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Generate a completely solved Sudoku board
 * 
 * Creates a valid 9x9 Sudoku board with all cells filled
 * using random number placement and backtracking.
 * 
 * @returns {number[][]} 2D array representing a solved board
 */
export function generateSolvedBoard() {
  const board = Array(SUDOKU.GRID_SIZE)
    .fill(null)
    .map(() => Array(SUDOKU.GRID_SIZE).fill(0));

  fillBoard(board);
  return board;
}

/**
 * Generate a Sudoku puzzle board based on difficulty
 * 
 * Creates a puzzle by:
 * 1. Generating a complete solved board
 * 2. Removing cells based on difficulty level
 * 3. Creating cell objects with metadata (editable, position, etc.)
 * 
 * @param {string} difficultyLevel - Difficulty level (easy, medium, hard, expert)
 * @returns {Object[][]} 2D array of cell objects with structure:
 *   - id: Unique cell identifier
 *   - value: Cell value (number 1-9 or empty string)
 *   - isEditable: Whether player can edit this cell
 *   - rowIndex: Row position
 *   - colIndex: Column position
 * 
 * @example
 * const board = generatePuzzleBoard('medium');
 * // Returns 9x9 grid with 30 pre-filled cells (based on medium difficulty)
 */
export function generatePuzzleBoard(difficultyLevel) {
  const filledCells = DIFFICULTY_SETTINGS[difficultyLevel]?.filledCells || 30;
  const solvedBoard = generateSolvedBoard();

  const newBoard = [];
  const totalCells = SUDOKU.GRID_SIZE * SUDOKU.GRID_SIZE;
  const cellsToRemove = totalCells - filledCells;

  // Create list of all positions
  const positions = [];
  for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
    for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
      positions.push({ row, col });
    }
  }

  // Randomly select cells to remove
  shuffleArray(positions);

  const cellsToRemoveSet = new Set();
  for (let i = 0; i < cellsToRemove; i++) {
    const pos = positions[i];
    cellsToRemoveSet.add(`${pos.row}-${pos.col}`);
  }

  // Build the board with cell objects
  for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
    const rowCells = [];
    for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
      const key = `${row}-${col}`;
      const isPreFilled = !cellsToRemoveSet.has(key);

      rowCells.push({
        id: `cell-${row}-${col}`,
        value: isPreFilled ? solvedBoard[row][col] : SUDOKU.EMPTY_CELL,
        isEditable: !isPreFilled,
        rowIndex: row,
        colIndex: col,
      });
    }
    newBoard.push(rowCells);
  }
  
  return newBoard;
}

/**
 * Validate a cell placement in a board
 * 
 * This is used by the UI to check if a player's move is valid
 * 
 * @param {Object[][]} board - Current board state (cell objects)
 * @param {number} rowIndex - Row to check
 * @param {number} colIndex - Column to check
 * @param {number|string} value - Value to validate
 * @returns {boolean} True if placement is valid
 */
export function validateCellPlacement(board, rowIndex, colIndex, value) {
  if (!value || value === SUDOKU.EMPTY_CELL) return true;

  const numValue = typeof value === 'string' ? parseInt(value) : value;

  // Check row
  for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
    if (col !== colIndex && board[rowIndex][col].value === numValue) {
      return false;
    }
  }

  // Check column
  for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
    if (row !== rowIndex && board[row][colIndex].value === numValue) {
      return false;
    }
  }

  // Check 3x3 subgrid
  const subgridRowStart =
    Math.floor(rowIndex / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;
  const subgridColStart =
    Math.floor(colIndex / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;

  for (
    let row = subgridRowStart;
    row < subgridRowStart + SUDOKU.SUBGRID_SIZE;
    row++
  ) {
    for (
      let col = subgridColStart;
      col < subgridColStart + SUDOKU.SUBGRID_SIZE;
      col++
    ) {
      if (
        (row !== rowIndex || col !== colIndex) &&
        board[row][col].value === numValue
      ) {
        return false;
      }
    }
  }

  return true;
}

export default {
  generateSolvedBoard,
  generatePuzzleBoard,
  validateCellPlacement,
};

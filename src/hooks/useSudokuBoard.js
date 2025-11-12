import { useState, useCallback } from "react";
import { SUDOKU } from "../constants";
import { 
  generatePuzzleBoard, 
  validateCellPlacement 
} from "../services";

/**
 * Custom hook for managing Sudoku board state
 * 
 * This hook manages the game board state and provides methods to:
 * - Update cells
 * - Check board completion
 * - Validate cell placements
 * - Generate new games
 * - Restore saved games
 * 
 * 
 * @param {string} difficulty - Game difficulty level
 * @param {Object[][]|null} initialBoard - Optional initial board state for restoring
 * @returns {Object} Board state and manipulation methods
 * 
 * @example
 * const { board, updateCell, isBoardComplete, newGame } = useSudokuBoard('medium');
 */
const useSudokuBoard = (difficulty = "medium", initialBoard = null) => {
  const [board, setBoard] = useState(
    () => initialBoard || generatePuzzleBoard(difficulty)
  );

  /**
   * Update a cell value in the board
   * @param {number} rowIndex - Row index (0-8)
   * @param {number} colIndex - Column index (0-8)
   * @param {number|string} value - New cell value
   */
  const updateCell = useCallback((rowIndex, colIndex, value) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));

      if (newBoard[rowIndex][colIndex].isEditable) {
        newBoard[rowIndex][colIndex].value = value;
      }

      return newBoard;
    });
  }, []);

  /**
   * Check if the board is completely filled
   * @returns {boolean} True if all cells have values
   */
  const isBoardComplete = useCallback(() => {
    return board.every((row) =>
      row.every((cell) => cell.value !== SUDOKU.EMPTY_CELL)
    );
  }, [board]);

  /**
   * Check if a value can be validly placed at a position
   * Uses the validateCellPlacement service for validation logic
   * @param {number} rowIndex - Row index
   * @param {number} colIndex - Column index  
   * @param {number|string} value - Value to validate
   * @returns {boolean} True if placement is valid
   */
  const isValidPlacement = useCallback(
    (rowIndex, colIndex, value) => {
      return validateCellPlacement(board, rowIndex, colIndex, value);
    },
    [board]
  );

  /**
   * Reset the board with a new puzzle
   * @param {string} newDifficulty - Optional new difficulty level
   */
  const resetBoard = useCallback(
    (newDifficulty) => {
      const newBoard = generatePuzzleBoard(newDifficulty || difficulty);
      setBoard(newBoard);
    },
    [difficulty]
  );

  /**
   * Start a new game with optional different difficulty
   * @param {string} newDifficulty - Optional new difficulty level
   */
  const newGame = useCallback(
    (newDifficulty) => {
      resetBoard(newDifficulty);
    },
    [resetBoard]
  );

  /**
   * Restore a previously saved board state
   * @param {Object[][]} savedBoard - Saved board to restore
   */
  const restoreBoard = useCallback((savedBoard) => {
    if (savedBoard) {
      setBoard(savedBoard);
    }
  }, []);

  return {
    board,
    updateCell,
    isBoardComplete,
    isValidPlacement,
    resetBoard,
    newGame,
    restoreBoard,
  };
};

export default useSudokuBoard;

import { useState, useCallback } from "react";
import { SUDOKU, DIFFICULTY_SETTINGS } from "../constants";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isValidPlacementInArray(board, row, col, num) {
  for (let c = 0; c < SUDOKU.GRID_SIZE; c++) {
    if (board[row][c] === num) return false;
  }
  
  for (let r = 0; r < SUDOKU.GRID_SIZE; r++) {
    if (board[r][col] === num) return false;
  }

  const startRow = Math.floor(row / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;
  const startCol = Math.floor(col / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;
  
  for (let r = startRow; r < startRow + SUDOKU.SUBGRID_SIZE; r++) {
    for (let c = startCol; c < startCol + SUDOKU.SUBGRID_SIZE; c++) {
      if (board[r][c] === num) return false;
    }
  }
  
  return true;
}

function fillBoard(board) {
  for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
    for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        
        for (const num of numbers) {
          if (isValidPlacementInArray(board, row, col, num)) {
            board[row][col] = num;
            
            if (fillBoard(board)) {
              return true;
            }
            
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSolvedBoard() {
  const board = Array(SUDOKU.GRID_SIZE).fill(null).map(() => 
    Array(SUDOKU.GRID_SIZE).fill(0)
  );
  
  fillBoard(board);
  return board;
}

function generateInitialBoard(difficultyLevel) {
  const filledCells = DIFFICULTY_SETTINGS[difficultyLevel]?.filledCells || 30;
  const solvedBoard = generateSolvedBoard();
  
  const newBoard = [];
  const totalCells = SUDOKU.GRID_SIZE * SUDOKU.GRID_SIZE;
  const cellsToRemove = totalCells - filledCells;
  
  const positions = [];
  for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
    for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
      positions.push({ row, col });
    }
  }
  
  shuffleArray(positions);
  
  const cellsToRemoveSet = new Set();
  for (let i = 0; i < cellsToRemove; i++) {
    const pos = positions[i];
    cellsToRemoveSet.add(`${pos.row}-${pos.col}`);
  }
  
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

const useSudokuBoard = (difficulty = "medium") => {
  const [board, setBoard] = useState(() => generateInitialBoard(difficulty));

  const updateCell = useCallback((rowIndex, colIndex, value) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.map((cell) => ({ ...cell })));

      if (newBoard[rowIndex][colIndex].isEditable) {
        newBoard[rowIndex][colIndex].value = value;
      }

      return newBoard;
    });
  }, []);

  const isBoardComplete = useCallback(() => {
    return board.every((row) =>
      row.every((cell) => cell.value !== SUDOKU.EMPTY_CELL)
    );
  }, [board]);

  const isValidPlacement = useCallback(
    (rowIndex, colIndex, value) => {
      if (!value || value === SUDOKU.EMPTY_CELL) return true;

      for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
        if (col !== colIndex && board[rowIndex][col].value === value) {
          return false;
        }
      }

      for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
        if (row !== rowIndex && board[row][colIndex].value === value) {
          return false;
        }
      }

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
            board[row][col].value === value
          ) {
            return false;
          }
        }
      }

      return true;
    },
    [board]
  );

  const resetBoard = useCallback(
    (newDifficulty) => {
      const newBoard = generateInitialBoard(newDifficulty || difficulty);
      setBoard(newBoard);
    },
    [difficulty]
  );

  const newGame = useCallback(
    (newDifficulty) => {
      resetBoard(newDifficulty);
    },
    [resetBoard]
  );

  return {
    board,
    updateCell,
    isBoardComplete,
    isValidPlacement,
    resetBoard,
    newGame,
  };
};

export default useSudokuBoard;

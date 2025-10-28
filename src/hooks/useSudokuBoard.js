import { useState, useCallback } from 'react';
import { SUDOKU } from '../constants';

const useSudokuBoard = () => {
    const [board, setBoard] = useState(() => generateInitialBoard());

    function generateInitialBoard() {
        const newBoard = [];
        for (let row = 0; row < SUDOKU.GRID_SIZE; row++) {
            const rowCells = [];
            for (let col = 0; col < SUDOKU.GRID_SIZE; col++) {
                const isPreFilled = Math.random() < 0.3;
                const value = isPreFilled ? Math.floor(Math.random() * SUDOKU.MAX_VALUE) + 1 : SUDOKU.EMPTY_CELL;
                
                rowCells.push({
                    id: `cell-${row}-${col}`,
                    value: value,
                    isEditable: !isPreFilled,
                    rowIndex: row,
                    colIndex: col
                });
            }
            newBoard.push(rowCells);
        }
        return newBoard;
    }

    const updateCell = useCallback((rowIndex, colIndex, value) => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));
            
            if (newBoard[rowIndex][colIndex].isEditable) {
                newBoard[rowIndex][colIndex].value = value;
            }
            
            return newBoard;
        });
    }, []);

    const isBoardComplete = useCallback(() => {
        return board.every(row => 
            row.every(cell => cell.value !== SUDOKU.EMPTY_CELL)
        );
    }, [board]);

    const isValidPlacement = useCallback((rowIndex, colIndex, value) => {
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

        const subgridRowStart = Math.floor(rowIndex / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;
        const subgridColStart = Math.floor(colIndex / SUDOKU.SUBGRID_SIZE) * SUDOKU.SUBGRID_SIZE;

        for (let row = subgridRowStart; row < subgridRowStart + SUDOKU.SUBGRID_SIZE; row++) {
            for (let col = subgridColStart; col < subgridColStart + SUDOKU.SUBGRID_SIZE; col++) {
                if ((row !== rowIndex || col !== colIndex) && board[row][col].value === value) {
                    return false;
                }
            }
        }

        return true;
    }, [board]);

    const resetBoard = useCallback(() => {
        const newBoard = generateInitialBoard();
        setBoard(newBoard);
    }, []);

    const newGame = useCallback(() => {
        resetBoard();
    }, [resetBoard]);

    return {
        board,
        updateCell,
        isBoardComplete,
        isValidPlacement,
        resetBoard,
        newGame
    };
};

export default useSudokuBoard;

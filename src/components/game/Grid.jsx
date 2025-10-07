import {Cell} from '../index.jsx';

const Grid = ({
                  onCellChange,
                  disabled = false
              }) => {
    const createPlaceholderGrid = () => {
        const grid = [];
        for (let row = 0; row < 9; row++) {
            const rowCells = [];
            for (let col = 0; col < 9; col++) {

                const isPreFilled = Math.random() < 0.3;
                const value = isPreFilled ? Math.floor(Math.random() * 9) + 1 : '';

                rowCells.push({
                    id: `cell-${row}-${col}`,
                    value: value,
                    isEditable: !isPreFilled,
                    rowIndex: row,
                    colIndex: col
                });
            }
            grid.push(rowCells);
        }
        return grid;
    };

    const placeholderGrid = createPlaceholderGrid();

    const handleCellChange = (rowIndex, colIndex, value) => {
        if (disabled) return;

        if (onCellChange) {
            onCellChange(rowIndex, colIndex, value);
        }
    };

    return (
        <div className="sudoku-grid">
            {placeholderGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-grid__row">
                    {row.map((cell) => (
                        <Cell
                            key={cell.id}
                            id={cell.id}
                            value={cell.value}
                            isEditable={cell.isEditable}
                            rowIndex={cell.rowIndex}
                            colIndex={cell.colIndex}
                            onChange={handleCellChange}
                            disabled={disabled}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
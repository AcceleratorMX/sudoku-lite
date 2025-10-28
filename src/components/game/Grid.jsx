import {Cell} from '../index.jsx';

const Grid = ({
                  board,
                  onCellChange,
                  disabled = false
              }) => {
    const handleCellChange = (rowIndex, colIndex, value) => {
        if (disabled) return;

        if (onCellChange) {
            onCellChange(rowIndex, colIndex, value);
        }
    };

    if (!board || board.length === 0) {
        return <div className="sudoku-grid">Loading...</div>;
    }

    return (
        <div className="sudoku-grid">
            {board.map((row, rowIndex) => (
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
import { Cell } from "../index.jsx";
import { Grid as styles } from "../../css";

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
        const loadingClass = [styles.grid, styles.loading].join(" ");
        return <div className={loadingClass}>Loading...</div>;
    }

    return (
        <div className={styles.grid}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
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
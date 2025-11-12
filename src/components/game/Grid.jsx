import { Cell } from "../index";
import { classNames } from "../../utils";
import { Grid as styles } from "../../css";

/**
 * Grid Component
 * 
 * Renders the 9x9 Sudoku grid with all cells.
 * Manages cell change events and disabled state for the entire grid.
 * Shows a loading message if the board is not yet available.
 * 
 * @param {Object} props - Component props
 * @param {Array<Array<Object>>} props.board - 2D array of cell objects
 * @param {Function} props.onCellChange - Callback when a cell value changes
 * @param {boolean} [props.disabled=false] - Whether the entire grid is disabled
 * @returns {JSX.Element} Grid component
 */
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
        return <div className={classNames(styles.grid, styles.loading)}>Loading...</div>;
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
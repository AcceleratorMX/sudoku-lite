import { memo } from "react";
import { classNames } from "../../utils";
import { Cell as styles } from "../../css";

/**
 * Cell Component
 * 
 * Represents a single cell in the Sudoku grid.
 * Handles user input validation (only digits 1-9 or empty).
 * Applies special styling for 3x3 box borders and non-editable cells.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.value=""] - Current value of the cell (1-9 or empty)
 * @param {boolean} [props.isEditable=true] - Whether the cell can be edited
 * @param {number} props.rowIndex - Row index in the grid (0-8)
 * @param {number} props.colIndex - Column index in the grid (0-8)
 * @param {Function} props.onChange - Callback when cell value changes
 * @param {boolean} [props.disabled=false] - Whether the cell is disabled
 * @param {string} props.id - Unique identifier for the cell
 * @param {string} [props.className=""] - Additional CSS class names
 * @returns {JSX.Element} Cell component
 */
const Cell = memo(({
  value = "",
  isEditable = true,
  rowIndex,
  colIndex,
  onChange,
  disabled = false,
  id,
  className = "",
}) => {
    const handleChange = (e) => {
        const newValue = e.target.value;

        if (newValue === "" || /^[1-9]$/.test(newValue)) {
            if (onChange) {
                onChange(rowIndex, colIndex, newValue);
            }
        }
    };

    const shouldHaveBottomBorder = rowIndex % 3 === 2 && rowIndex !== 8;
    const shouldHaveRightBorder = colIndex % 3 === 2 && colIndex !== 8;

    return (
        <input
            type="text"
            className={classNames(
                styles.cell,
                shouldHaveBottomBorder && styles.bottomBorder,
                shouldHaveRightBorder && styles.rightBorder,
                !isEditable && styles.readonly,
                disabled && styles.disabled,
                className
            )}
            value={value}
            onChange={handleChange}
            maxLength="1"
            disabled={!isEditable || disabled}
            placeholder=""
            id={id}
        />
    );
});

export default Cell;

const Cell = ({
    value = '',
    isEditable = true,
    rowIndex,
    colIndex,
    onChange,
    disabled = false,
    id,
    className = ''
}) => {
    const handleChange = (e) => {
        const newValue = e.target.value;

        if (newValue === '' || /^[1-9]$/.test(newValue)) {
            if (onChange) {
                onChange(rowIndex, colIndex, newValue);
            }
        }
    };

    const getCellClassName = () => {
        let classNames = ['sudoku-cell'];

        if (rowIndex !== undefined && colIndex !== undefined) {
            if (rowIndex % 3 === 2 && rowIndex !== 8) {
                classNames.push('sudoku-cell--bottom-border');
            }
            if (colIndex % 3 === 2 && colIndex !== 8) {
                classNames.push('sudoku-cell--right-border');
            }
        }

        if (!isEditable) {
            classNames.push('sudoku-cell--readonly');
        }
        if (disabled) {
            classNames.push('sudoku-cell--disabled');
        }

        if (className) {
            classNames.push(className);
        }

        return classNames.join(' ');
    };

    return (
        <input
            type="text"
            className={getCellClassName()}
            value={value}
            onChange={handleChange}
            maxLength="1"
            disabled={!isEditable || disabled}
            placeholder=""
            id={id}
        />
    );
};

export default Cell;

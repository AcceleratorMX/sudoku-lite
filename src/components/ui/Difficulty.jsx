import {
  DIFFICULTY_LEVELS,
  DIFFICULTY_SETTINGS,
} from "../../constants/index.js";
import { classNames } from "../../utils/classNames.js";
import { Difficulty as styles } from "../../css";

/**
 * Difficulty Component
 *
 * A controlled select input for choosing game difficulty level.
 * Displays difficulty options with their descriptions.
 *
 * @param {Function} onChange - Callback when difficulty changes
 * @param {string} value - Current selected difficulty value
 * @param {string} className - Additional CSS classes
 */
const Difficulty = ({
  onChange,
  value = DIFFICULTY_LEVELS.MEDIUM,
  className = "",
}) => {
  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    if (onChange) {
      onChange(newDifficulty);
    }
  };

  const rootClassName = classNames(styles.gameSettingsForm, className);

  return (
    <div className={rootClassName}>
      <label htmlFor="difficulty-select" className={styles.label}></label>
      <select
        id="difficulty-select"
        className={styles.select}
        value={value}
        onChange={handleDifficultyChange}
      >
        {Object.values(DIFFICULTY_LEVELS).map((level) => {
          const settings = DIFFICULTY_SETTINGS[level];
          return (
            <option key={level} value={level} title={settings.description}>
              {settings.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Difficulty;

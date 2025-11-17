import { memo } from "react";
import { formatTime, getTimeStatus, getMovesStatus, classNames } from "../../utils";
import { TIME_STATUS, MOVES_STATUS } from "../../constants";
import { SudokuGame as styles } from "../../css";

/**
 * GameStats Component
 * 
 * Displays game statistics including moves, time, and mistakes.
 * Formats time display using formatTime utility.
 * Applies color coding based on performance thresholds.
 * 
 * @param {Object} props - Component props
 * @param {number} props.moves - Number of moves made
 * @param {number} props.time - Time elapsed in seconds
 * @param {number} props.mistakes - Number of mistakes made
 * @returns {JSX.Element} GameStats component
 */
const GameStats = memo(({ moves, time, mistakes }) => {
  const timeStatus = getTimeStatus(time);
  const movesStatus = getMovesStatus(moves);

  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Moves</span>
        <span className={classNames(
          styles.statValue,
          movesStatus === MOVES_STATUS.DANGER && styles.statDanger
        )}>{moves}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Time</span>
        <span className={classNames(
          styles.statValue,
          timeStatus === TIME_STATUS.WARNING && styles.statWarning,
          timeStatus === TIME_STATUS.DANGER && styles.statDanger
        )}>{formatTime(time)}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Mistakes</span>
        <span className={styles.statValue}>{mistakes}</span>
      </div>
    </div>
  );
});

export default GameStats;

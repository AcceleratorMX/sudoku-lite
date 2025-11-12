import { formatTime } from "../../utils/formatTime";
import { SudokuGame as styles } from "../../css";

/**
 * GameStats Component
 * 
 * Displays game statistics including moves, time, and mistakes.
 * Formats time display using formatTime utility.
 * 
 * @param {Object} props - Component props
 * @param {number} props.moves - Number of moves made
 * @param {number} props.time - Time elapsed in seconds
 * @param {number} props.mistakes - Number of mistakes made
 * @returns {JSX.Element} GameStats component
 */
const GameStats = ({ moves, time, mistakes }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Moves</span>
        <span className={styles.statValue}>{moves}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Time</span>
        <span className={styles.statValue}>{formatTime(time)}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statLabel}>Mistakes</span>
        <span className={styles.statValue}>{mistakes}</span>
      </div>
    </div>
  );
};

export default GameStats;

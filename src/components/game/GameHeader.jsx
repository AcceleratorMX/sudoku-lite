import { Button, GameStats } from "../index";
import { SudokuGame as styles } from "../../css";

/**
 * GameHeader Component
 * 
 * Displays the game header with player information, difficulty level,
 * game statistics, and control buttons (Pause/Resume and Reset).
 * 
 * @param {Object} props - Component props
 * @param {string} props.playerName - The name of the player
 * @param {string} props.difficulty - The difficulty level label
 * @param {number} props.moves - Number of moves made
 * @param {number} props.time - Time elapsed in seconds
 * @param {number} props.mistakes - Number of mistakes made
 * @param {boolean} props.isPaused - Whether the game is paused
 * @param {boolean} props.isCompleted - Whether the game is completed
 * @param {Function} props.onPause - Callback for pause/resume button
 * @param {Function} props.onReset - Callback for reset button
 * @returns {JSX.Element} GameHeader component
 */
const GameHeader = ({
  playerName,
  difficulty,
  moves,
  time,
  mistakes,
  isPaused,
  isCompleted,
  onPause,
  onReset,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <span className={styles.difficulty}>{difficulty}</span>
        <span className={styles.player}>{playerName}</span>
      </div>

      <GameStats moves={moves} time={time} mistakes={mistakes} />

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="small"
          onClick={onPause}
          disabled={isCompleted}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button variant="primary" size="small" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;

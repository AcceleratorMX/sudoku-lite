import PropTypes from "prop-types";
import { Portal, Button } from "../index";
import { GameCompletionDialog as styles } from "../../css";

/**
 * GameCompletionDialog Component
 * 
 * Modal dialog displayed when the player completes the Sudoku game.
 * Shows game statistics and provides options to play again, restart, or view results.
 * Uses Portal for rendering outside the normal DOM hierarchy.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is visible
 * @param {string} props.playerName - Name of the player who completed the game
 * @param {string} props.difficulty - Difficulty level of the completed game
 * @param {string} props.time - Formatted time taken to complete (e.g., "12:34")
 * @param {number} props.errors - Number of mistakes made during the game
 * @param {Function} props.onPlayAgain - Callback to start a new game with same settings
 * @param {Function} props.onRestart - Callback to restart the current game
 * @param {Function} props.onViewResults - Callback to view results/leaderboard
 * @returns {JSX.Element|null} GameCompletionDialog component or null if not open
 */
const GameCompletionDialog = ({
  isOpen,
  playerName,
  difficulty,
  time,
  errors,
  onPlayAgain,
  onViewResults,
}) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={styles.overlay}>
        <div className={styles.dialog}>
          <div className={styles.header}>
            <h2 className={styles.title}>Game completed!</h2>
          </div>

          <div className={styles.content}>
            <p className={styles.message}>
              Congratulations, <strong>{playerName}</strong>!
            </p>
            <p className={styles.message}>
              You have successfully completed the game on <strong>{difficulty}</strong> level.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Time:</span>
                <span className={styles.statValue}>{time}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Mistakes:</span>
                <span className={styles.statValue}>{errors}</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button onClick={onPlayAgain} variant="primary">
              Play Again
            </Button>
            <Button onClick={onViewResults} variant="secondary">
              View Results
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

GameCompletionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  playerName: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  errors: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onViewResults: PropTypes.func.isRequired,
};

export default GameCompletionDialog;

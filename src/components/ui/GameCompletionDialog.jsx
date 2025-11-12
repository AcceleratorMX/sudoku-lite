import PropTypes from "prop-types";
import Portal from "./Portal";
import Button from "./Button";
import { GameCompletionDialog as styles } from "../../css";

const GameCompletionDialog = ({
  isOpen,
  playerName,
  difficulty,
  time,
  errors,
  onPlayAgain,
  onRestart,
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
            <Button onClick={onRestart} variant="secondary">
              New Game
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

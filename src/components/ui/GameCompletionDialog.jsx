import PropTypes from "prop-types";
import Portal from "./Portal";
import Button from "./Button";

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
      <div className="dialog-overlay">
        <div className="dialog">
          <div className="dialog__header">
            <h2 className="dialog__title">Game completed!</h2>
          </div>

          <div className="dialog__content">
            <p className="dialog__message">
              Congratulations, <strong>{playerName}</strong>!
            </p>
            <p className="dialog__message">
              You have successfully completed the game on <strong>{difficulty}</strong> level.
            </p>

            <div className="dialog__stats">
              <div className="dialog__stat">
                <span className="dialog__stat-label">Time:</span>
                <span className="dialog__stat-value">{time}</span>
              </div>
              <div className="dialog__stat">
                <span className="dialog__stat-label">Mistakes:</span>
                <span className="dialog__stat-value">{errors}</span>
              </div>
            </div>
          </div>

          <div className="dialog__actions">
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

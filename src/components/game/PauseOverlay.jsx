import { memo } from "react";
import { SudokuGame as styles } from "../../css";

/**
 * PauseOverlay Component
 * 
 * Displays a pause overlay when the game is paused.
 * Shows a centered "Game Paused" message and covers the game board.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Whether the overlay should be visible
 * @returns {JSX.Element|null} PauseOverlay component or null if not visible
 */
const PauseOverlay = memo(({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.pauseOverlay}>
      <div className={styles.pauseMessage}>Game Paused</div>
    </div>
  );
});

export default PauseOverlay;

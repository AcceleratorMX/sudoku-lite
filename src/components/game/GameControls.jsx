import { Button } from "../index.jsx";
import { SudokuGame as styles } from "../../css";

/**
 * GameControls Component
 * 
 * Displays the bottom control buttons for the game.
 * Currently includes an Exit button to return to the start screen.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onExit - Callback for exit button
 * @returns {JSX.Element} GameControls component
 */
const GameControls = ({ onExit }) => {
  return (
    <div className={styles.controls}>
      <Button variant="secondary" size="medium" onClick={onExit}>
        Exit
      </Button>
    </div>
  );
};

export default GameControls;

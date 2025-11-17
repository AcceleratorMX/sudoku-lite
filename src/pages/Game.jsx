import { useParams, useNavigate } from "react-router-dom";
import { SudokuGame } from "../components/index";
import { useGameStore, usePlayerStore } from "../stores";
import { ROUTES } from "../constants";
import { Game as styles } from "../css";

/**
 * Game Page Component
 *
 * Main game page that:
 * - Loads player data and saved game
 * - Renders SudokuGame component
 * - Handles game completion and navigation
 *
 * Uses Zustand stores for state management
 */
const Game = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();

  // Get actions from Zustand stores (no need to pass data as props)
  const saveGameProgress = useGameStore((state) => state.saveGameProgress);
  const clearAllGames = useGameStore((state) => state.clearAllGames);
  const saveGameResults = usePlayerStore((state) => state.saveGameResults);
  const clearAllPlayers = usePlayerStore((state) => state.clearAll);

  /**
   * Handle game completion
   * Saves results and navigates to scores page
   * @param {Object} gameResults - Final game results
   */
  const handleGameComplete = (gameResults) => {
    saveGameResults(playerId, gameResults);
    navigate(ROUTES.SCORES(playerId));
  };

  /**
   * Handle back to start navigation
   * Clears ALL game and player data and returns to start page
   */
  const handleBackToStart = () => {
    clearAllGames();
    clearAllPlayers();
    
    // Force navigation after cleanup
    setTimeout(() => {
      navigate(ROUTES.START);
    }, 0);
  };

  /**
   * Handle game progress saving
   * @param {Array} board - Current board state
   * @param {Object} stats - Current statistics
   * @param {number} time - Elapsed time
   */
  const handleSaveProgress = (board, stats, time) => {
    if (board !== null) {
      saveGameProgress(playerId, board, stats, time);
    }
  };

  return (
    <div className={styles.gamePage}>
      <div className={styles.container}>
        <SudokuGame
          playerId={playerId}
          onSaveProgress={handleSaveProgress}
          onGameComplete={handleGameComplete}
          onBackToStart={handleBackToStart}
          className={styles.sudoku}
        />
      </div>
    </div>
  );
};

export default Game;

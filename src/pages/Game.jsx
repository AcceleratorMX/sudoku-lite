import { useParams } from "react-router-dom";
import { SudokuGame } from "../components/index";
import { usePlayerSession } from "../hooks";
import { gameStorageService } from "../services";
import { Game as styles } from "../css";

/**
 * Game Page Component
 *
 * Main game page that:
 * - Loads player data and saved game
 * - Renders SudokuGame component
 * - Handles game completion and navigation
 *
 * Now uses service layer for storage operations instead of
 * direct localStorage manipulation.
 */
const Game = () => {
  const { playerId } = useParams();
  const { navigateToScores, navigateToStart } = usePlayerSession();

  // Load player data using service
  const playerData = gameStorageService.getPlayerData(playerId) || {
    playerName: "Player",
    gameSettings: { difficulty: "medium" },
  };

  // Load saved game using service
  const savedGame = gameStorageService.getSavedGame(playerId);

  /**
   * Handle game completion
   * Saves results and navigates to scores page
   * @param {Object} gameResults - Final game results
   */
  const handleGameComplete = (gameResults) => {
    gameStorageService.saveGameResults(playerId, gameResults);
    gameStorageService.removeSavedGame(playerId);
    navigateToScores(playerId);
  };

  /**
   * Handle back to start navigation
   * Clears saved game and returns to start page
   */
  const handleBackToStart = () => {
    gameStorageService.removeSavedGame(playerId);
    navigateToStart();
  };

  /**
   * Handle game progress saving
   * @param {Array} board - Current board state
   * @param {Object} stats - Current statistics
   * @param {number} time - Elapsed time
   */
  const handleSaveProgress = (board, stats, time) => {
    if (board === null) {
      gameStorageService.removeSavedGame(playerId);
    } else {
      gameStorageService.saveGameProgress(playerId, {
        board,
        stats,
        time,
        difficulty: playerData.gameSettings?.difficulty,
      });
    }
  };

  return (
    <div className={styles.gamePage}>
      <div className={styles.container}>
        <SudokuGame
          playerName={playerData.playerName}
          gameSettings={playerData.gameSettings}
          savedGame={savedGame}
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

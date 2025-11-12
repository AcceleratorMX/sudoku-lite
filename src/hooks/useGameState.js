import useLocalStorage from "./useLocalStorage";
import { APP_STATES } from "../constants";

/**
 * Custom hook for managing global game state
 * 
 * Manages application-level state including:
 * - Current page/route state
 * - Player data (name, settings)
 * - Game results
 * - Saved game progress
 * 
 * State is persisted to localStorage for session continuity.
 * 
 * @returns {Object} Game state management object
 * @returns {Object} returns.savedState - Current saved state
 * @returns {Function} returns.saveGameState - Save game state function
 * @returns {Function} returns.clearGameState - Clear all game state
 * @returns {Function} returns.loadGame - Load saved game
 */
const GAME_STATE_KEY = "sudoku-game-state";

export const useGameState = () => {
  const [savedState, setSavedState] = useLocalStorage(GAME_STATE_KEY, {
    currentPage: APP_STATES.START,
    playerData: {
      playerName: "",
      gameSettings: null,
    },
    gameResults: null,
    savedGame: null,
  });

  const saveGameState = (
    page,
    playerData,
    gameResults = null,
    savedGame = null
  ) => {
    setSavedState({
      currentPage: page,
      playerData,
      gameResults,
      savedGame,
    });
  };

  const clearGameState = () => {
    setSavedState({
      currentPage: APP_STATES.START,
      playerData: {
        playerName: "",
        gameSettings: null,
      },
      gameResults: null,
      savedGame: null,
    });
  };

  const saveGameProgress = (board, stats, time) => {
    setSavedState((prev) => ({
      ...prev,
      savedGame: {
        board,
        stats,
        time,
        timestamp: Date.now(),
      },
    }));
  };

  return {
    savedState,
    saveGameState,
    clearGameState,
    saveGameProgress,
  };
};

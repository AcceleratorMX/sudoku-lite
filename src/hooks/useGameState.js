import useLocalStorage from "./useLocalStorage";
import { APP_STATES } from "../constants";

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

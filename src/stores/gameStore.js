import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DIFFICULTY_LEVELS } from '../constants';

/**
 * Game Store - Global state management for game data
 * 
 * Manages:
 * - Current player session
 * - Saved games per player
 * - Game settings (difficulty)
 * - Auto-persistence to localStorage
 * 
 * Uses Zustand with persist middleware for automatic localStorage sync
 */
const useGameStore = create(
  persist(
    (set, get) => ({
      // State
      currentPlayerId: null,
      savedGames: {}, // { playerId: { playerName, settings, board, stats, time, timestamp } }
      gameSettings: {
        difficulty: DIFFICULTY_LEVELS.MEDIUM,
      },

      // Actions

      /**
       * Update game settings (difficulty)
       * @param {Object} newSettings - New settings object
       */
      setGameSettings: (newSettings) => {
        set({ gameSettings: newSettings });
      },

      /**
       * Start a new game session for a player
       * @param {string} playerId - Unique player identifier
       * @param {string} playerName - Player's name
       * @param {Object} settings - Game settings (difficulty, etc.)
       */
      startNewGame: (playerId, playerName, settings) => {
        set({
          currentPlayerId: playerId,
          savedGames: {
            ...get().savedGames,
            [playerId]: {
              playerName,
              settings,
              difficulty: settings.difficulty,
              board: null,
              stats: null,
              time: 0,
              timestamp: Date.now(),
            },
          },
        });
      },

      /**
       * Save game progress for a player
       * @param {string} playerId - Player identifier
       * @param {Array} board - Current board state
       * @param {Object} stats - Current game statistics
       * @param {number} time - Elapsed time in seconds
       */
      saveGameProgress: (playerId, board, stats, time) => {
        const savedGame = get().savedGames[playerId];
        if (!savedGame) return;

        set({
          savedGames: {
            ...get().savedGames,
            [playerId]: {
              ...savedGame,
              board,
              stats,
              time,
              timestamp: Date.now(),
            },
          },
        });
      },

      /**
       * Get saved game for a player
       * @param {string} playerId - Player identifier
       * @returns {Object|null} Saved game data or null
       */
      getSavedGame: (playerId) => {
        return get().savedGames[playerId] || null;
      },

      /**
       * Clear/delete a player's saved game
       * @param {string} playerId - Player identifier
       */
      clearGame: (playerId) => {
        const { [playerId]: _removed, ...rest } = get().savedGames;
        set({ savedGames: rest });
        
        // If clearing current player, reset currentPlayerId
        if (get().currentPlayerId === playerId) {
          set({ currentPlayerId: null });
        }
      },

      /**
       * Set current active player
       * @param {string} playerId - Player identifier
       */
      setCurrentPlayer: (playerId) => {
        set({ currentPlayerId: playerId });
      },

      /**
       * Clear all game data (reset store)
       */
      clearAllGames: () => {
        set({
          currentPlayerId: null,
          savedGames: {},
        });
      },
    }),
    {
      name: 'sudoku-game-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        savedGames: state.savedGames,
        gameSettings: state.gameSettings,
      }),
    }
  )
);

export default useGameStore;

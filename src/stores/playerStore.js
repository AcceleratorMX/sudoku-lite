import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Player Store - Global state management for player data
 * 
 * Manages:
 * - Individual player data per playerId
 * - Game results per player
 * - Player cleanup operations
 * - Auto-persistence to localStorage
 * 
 * This store complements gameStore by managing
 * player-specific data and results.
 */
const usePlayerStore = create(
  persist(
    (set, get) => ({
      // State
      players: {}, // { playerId: { playerName, gameSettings } }
      gameResults: {}, // { playerId: { score, time, moves, mistakes, difficulty } }

      // Actions

      /**
       * Save player data
       * @param {string} playerId - Unique player identifier
       * @param {Object} playerData - Player data object
       * @param {string} playerData.playerName - Player's name
       * @param {Object} playerData.gameSettings - Game settings
       */
      savePlayerData: (playerId, playerData) => {
        set({
          players: {
            ...get().players,
            [playerId]: playerData,
          },
        });
      },

      /**
       * Get player data by ID
       * @param {string} playerId - Player identifier
       * @returns {Object|null} Player data or null
       */
      getPlayerData: (playerId) => {
        return get().players[playerId] || null;
      },

      /**
       * Remove player data
       * @param {string} playerId - Player identifier
       */
      removePlayerData: (playerId) => {
        const { [playerId]: _removed, ...rest } = get().players;
        set({ players: rest });
      },

      /**
       * Save game results for a player
       * @param {string} playerId - Player identifier
       * @param {Object} results - Game results object
       * @param {string} results.playerName - Player name
       * @param {number} results.score - Final score
       * @param {number} results.time - Time in seconds
       * @param {number} results.moves - Number of moves
       * @param {number} results.mistakes - Number of mistakes
       * @param {string} results.difficulty - Difficulty level
       */
      saveGameResults: (playerId, results) => {
        set({
          gameResults: {
            ...get().gameResults,
            [playerId]: results,
          },
        });
      },

      /**
       * Get game results for a player
       * @param {string} playerId - Player identifier
       * @returns {Object|null} Game results or null
       */
      getGameResults: (playerId) => {
        return get().gameResults[playerId] || null;
      },

      /**
       * Remove game results for a player
       * @param {string} playerId - Player identifier
       */
      removeGameResults: (playerId) => {
        const { [playerId]: _removed, ...rest } = get().gameResults;
        set({ gameResults: rest });
      },

      /**
       * Clear all data for a player (data + results)
       * Also triggers persist to save changes immediately
       * @param {string} playerId - Player identifier
       */
      clearPlayerData: (playerId) => {
        // Remove player data
        const { [playerId]: _removedPlayer, ...restPlayers } = get().players;
        // Remove game results
        const { [playerId]: _removedResults, ...restResults } = get().gameResults;

        set({
          players: restPlayers,
          gameResults: restResults,
        });
        
        // Force persist to localStorage immediately
        // Zustand persist middleware should handle this automatically
        // but we ensure it's called by triggering a state update
      },

      /**
       * Clear all players and results
       */
      clearAll: () => {
        set({
          players: {},
          gameResults: {},
        });
      },
    }),
    {
      name: 'sudoku-players', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePlayerStore;

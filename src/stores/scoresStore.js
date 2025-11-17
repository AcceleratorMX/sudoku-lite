import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Scores Store - Global state management for leaderboard
 * 
 * Manages:
 * - All player scores
 * - Leaderboard rankings
 * - Score updates and sorting
 * - Auto-persistence to localStorage
 * 
 * Features:
 * - Keep only top 100 scores
 * - Update player score only if new score is better
 * - Automatic sorting by score (descending)
 */
const useScoresStore = create(
  persist(
    (set, get) => ({
      // State
      scores: [], // Array of score objects

      // Actions

      /**
       * Add a new score to the leaderboard
       * - If player exists, update only if new score is better OR equal (to move up in ranking)
       * - If player doesn't exist, add new score
       * - Keep only top 100 scores
       * - Auto-sort by score descending, then by date descending (newer first)
       * 
       * @param {Object} newScore - Score object
       * @param {string} newScore.name - Player name
       * @param {number} newScore.score - Final score
       * @param {number} newScore.time - Time in seconds
       * @param {number} newScore.moves - Number of moves
       * @param {number} newScore.mistakes - Number of mistakes
       * @param {string} newScore.difficulty - Difficulty level
       * @param {string} newScore.date - ISO date string
       */
      addScore: (newScore) => {
        const scores = get().scores;
        const existingIndex = scores.findIndex((s) => s.name === newScore.name);

        let updatedScores;

        if (existingIndex !== -1) {
          const existingScore = scores[existingIndex];

          // Update if new score is better OR equal (allows climbing with same score)
          if (newScore.score >= existingScore.score) {
            updatedScores = [...scores];
            updatedScores[existingIndex] = {
              ...newScore,
              id: existingScore.id, // Keep original ID
            };
          } else {
            return;
          }
        } else {
          // Add new score
          const scoreId = `score_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 11)}`;

          updatedScores = [
            ...scores,
            {
              ...newScore,
              id: scoreId,
            },
          ];
        }

        // Sort by score descending, then by date descending (newer results first)
        updatedScores.sort((a, b) => {
          // Primary sort: by score (higher is better)
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          // Secondary sort: by date (newer is better)
          return new Date(b.date) - new Date(a.date);
        });
        updatedScores = updatedScores.slice(0, 100);

        set({ scores: updatedScores });
      },

      /**
       * Get top N scores from leaderboard
       * @param {number} limit - Number of top scores to return (default: 10)
       * @returns {Array} Array of top score objects
       */
      getTopScores: (limit = 10) => {
        return get().scores.slice(0, limit);
      },

      /**
       * Get all scores
       * @returns {Array} All scores
       */
      getAllScores: () => {
        return get().scores;
      },

      /**
       * Get player's rank by name
       * @param {string} playerName - Player name
       * @returns {number|null} Player rank (1-based) or null if not found
       */
      getPlayerRank: (playerName) => {
        const scores = get().scores;
        const index = scores.findIndex((s) => s.name === playerName);
        return index !== -1 ? index + 1 : null;
      },

      /**
       * Get player's score data by name
       * @param {string} playerName - Player name
       * @returns {Object|null} Player's score object or null
       */
      getPlayerScore: (playerName) => {
        const scores = get().scores;
        return scores.find((s) => s.name === playerName) || null;
      },

      /**
       * Clear all scores (reset leaderboard)
       */
      clearScores: () => {
        set({ scores: [] });
      },

      /**
       * Remove a specific score by ID
       * @param {string} scoreId - Score ID to remove
       */
      removeScore: (scoreId) => {
        const scores = get().scores;
        set({ scores: scores.filter((s) => s.id !== scoreId) });
      },
    }),
    {
      name: 'sudoku-scores', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useScoresStore;
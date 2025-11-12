import { useState, useEffect, useCallback } from "react";
import { gameStorageService } from "../services/storage";

/**
 * Custom hook for managing game scores and leaderboard
 *
 * Features:
 * - Load and save scores to storage
 * - Add new score with ranking logic
 * - Update existing player scores (keep best)
 * - Calculate player rank
 * - Maintain top 100 scores
 *
 * This hook extracts all the complex scoring logic that was
 * previously embedded in the Scores page component.
 *
 * @param {Object|null} gameResults - Current game results to add (if any)
 * @returns {Object} Scores state and methods
 *
 * @example
 * const { allScores, currentPlayerRank, topPlayers } = useScoreManager(gameResults);
 */
export function useScoreManager(gameResults) {
  const [allScores, setAllScores] = useState([]);
  const [currentPlayerRank, setCurrentPlayerRank] = useState(null);

  // Load scores from storage on mount
  useEffect(() => {
    const scores = gameStorageService.getAllScores();
    setAllScores(scores);
  }, []);

  // Process and add new game results
  useEffect(() => {
    if (!gameResults) return;

    const scoreId = `score_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 11)}`;

    const newScore = {
      id: scoreId,
      name: gameResults.playerName,
      score: gameResults.score,
      time: gameResults.time,
      moves: gameResults.moves,
      mistakes: gameResults.mistakes,
      difficulty: gameResults.difficulty,
      date: new Date().toISOString(),
    };

    addScore(newScore);
  }, [gameResults]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Add or update a score in the leaderboard
   * - If player exists, update only if new score is better
   * - If player doesn't exist, add new score
   * - Keep only top 100 scores
   * - Update player rank
   *
   * @param {Object} newScore - Score object to add
   */
  const addScore = useCallback((newScore) => {
    setAllScores((prevScores) => {
      const existingPlayerIndex = prevScores.findIndex(
        (s) => s.name === newScore.name
      );

      let updatedScores;

      if (existingPlayerIndex !== -1) {
        const existingScore = prevScores[existingPlayerIndex];

        // Update only if new score is better
        if (newScore.score > existingScore.score) {
          updatedScores = [...prevScores];
          updatedScores[existingPlayerIndex] = newScore;
        } else {
          // Keep existing score
          updatedScores = prevScores;
        }
      } else {
        // Add new player score
        updatedScores = [...prevScores, newScore];
      }

      // Sort by score (descending) and keep top 100
      updatedScores.sort((a, b) => b.score - a.score);
      const topScores = updatedScores.slice(0, 100);

      // Save to storage
      gameStorageService.saveScores(topScores);

      // Calculate rank for current player
      const rank = topScores.findIndex((s) => s.name === newScore.name) + 1;
      if (rank > 0) {
        setCurrentPlayerRank(rank);
      }

      return topScores;
    });
  }, []);

  /**
   * Get top N players for leaderboard display
   * @param {number} count - Number of top players to return
   * @returns {Array} Array of player objects with rank
   */
  const getTopPlayers = useCallback(
    (count = 10) => {
      return allScores.slice(0, count).map((score, index) => ({
        id: score.id,
        rank: index + 1,
        name: score.name,
        score: score.score,
      }));
    },
    [allScores]
  );

  /**
   * Get current player info for display
   * @param {string} playerName - Player name to find
   * @returns {Object|null} Player object with rank or null
   */
  const getCurrentPlayer = useCallback(
    (playerName) => {
      if (!currentPlayerRank || !playerName) return null;

      const score = allScores.find((s) => s.name === playerName);
      if (!score) return null;

      return {
        id: score.id,
        rank: currentPlayerRank,
        name: score.name,
        score: score.score,
      };
    },
    [allScores, currentPlayerRank]
  );

  return {
    allScores,
    currentPlayerRank,
    getTopPlayers,
    getCurrentPlayer,
    addScore,
  };
}

export default useScoreManager;

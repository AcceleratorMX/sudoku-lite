import { useState, useCallback } from 'react';

/**
 * Custom hook for managing game statistics and state
 * 
 * Manages:
 * - Move counter
 * - Mistake counter
 * - Score tracking
 * - Game completion state
 * - Game pause state
 * 
 * Note: Score calculation logic has been moved to utils/score/calculateScore
 * This hook only manages the state, not the calculation logic.
 * 
 * @param {Object|null} initialStats - Optional initial statistics to restore saved game
 * @param {number} initialStats.moves - Initial move count
 * @param {number} initialStats.mistakes - Initial mistake count
 * @param {number} initialStats.score - Initial score
 * @param {boolean} initialStats.isCompleted - Initial completion state
 * @param {boolean} initialStats.isPaused - Initial pause state
 * @returns {Object} Stats object and methods to manipulate them
 * 
 * @example
 * const { stats, incrementMoves, incrementMistakes, completeGame } = useGameStats();
 * incrementMoves(); // stats.moves++
 * incrementMistakes(); // stats.mistakes++
 * completeGame(); // stats.isCompleted = true
 */
const useGameStats = (initialStats = null) => {
    const [stats, setStats] = useState(initialStats || {
        moves: 0,
        mistakes: 0,
        score: 0,
        isCompleted: false,
        isPaused: false
    });

    /**
     * Increment the moves counter by 1
     */
    const incrementMoves = useCallback(() => {
        setStats(prev => ({
            ...prev,
            moves: prev.moves + 1
        }));
    }, []);

    /**
     * Increment the mistakes counter by 1
     */
    const incrementMistakes = useCallback(() => {
        setStats(prev => ({
            ...prev,
            mistakes: prev.mistakes + 1
        }));
    }, []);

    /**
     * Update the score value
     * @param {number} newScore - New score value
     */
    const updateScore = useCallback((newScore) => {
        setStats(prev => ({
            ...prev,
            score: newScore
        }));
    }, []);

    /**
     * Mark the game as completed
     */
    const completeGame = useCallback(() => {
        setStats(prev => ({
            ...prev,
            isCompleted: true
        }));
    }, []);

    /**
     * Toggle the pause state between paused and unpaused
     */
    const togglePause = useCallback(() => {
        setStats(prev => ({
            ...prev,
            isPaused: !prev.isPaused
        }));
    }, []);

    /**
     * Reset all statistics to initial values
     */
    const resetStats = useCallback(() => {
        setStats({
            moves: 0,
            mistakes: 0,
            score: 0,
            isCompleted: false,
            isPaused: false
        });
    }, []);

    /**
     * Restore statistics from saved game state
     * @param {Object} savedStats - Previously saved statistics object
     */
    const restoreStats = useCallback((savedStats) => {
        if (savedStats) {
            setStats(savedStats);
        }
    }, []);

    return {
        stats,
        incrementMoves,
        incrementMistakes,
        updateScore,
        completeGame,
        togglePause,
        resetStats,
        restoreStats,
    };
};

export default useGameStats;

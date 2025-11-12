import { useEffect, useRef } from 'react';
import { gameStorageService } from '../services/storage';

/**
 * Custom hook for automatic game progress persistence
 * 
 * Features:
 * - Automatic saving with debounce
 * - Save on game state changes
 * - Load saved game on mount
 * - Clear saved game when completed
 * 
 * This hook extracts the auto-save logic that was previously
 * embedded in SudokuGame component's useEffect.
 * 
 * @param {string} playerId - Player identifier
 * @param {Object} gameState - Current game state to persist
 * @param {Array} gameState.board - Current board state
 * @param {Object} gameState.stats - Current statistics
 * @param {number} gameState.time - Elapsed time
 * @param {string} gameState.difficulty - Game difficulty
 * @param {boolean} isCompleted - Whether game is completed
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500)
 * 
 * @example
 * useGamePersistence(playerId, { board, stats, time, difficulty }, isCompleted);
 */
export function useGamePersistence(
  playerId,
  gameState,
  isCompleted = false,
  debounceMs = 500
) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Don't save if game is completed
    if (isCompleted || !playerId || !gameState.board) {
      return;
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the save operation
    timeoutRef.current = setTimeout(() => {
      gameStorageService.saveGameProgress(playerId, gameState);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [playerId, gameState, isCompleted, debounceMs]);

  /**
   * Manually clear saved game
   */
  const clearSavedGame = () => {
    if (playerId) {
      gameStorageService.removeSavedGame(playerId);
    }
  };

  return { clearSavedGame };
}

/**
 * Load saved game for a player
 * 
 * @param {string} playerId - Player identifier
 * @param {string} currentDifficulty - Current difficulty to validate against
 * @returns {Object|null} Saved game or null if not found/invalid
 */
export function useLoadSavedGame(playerId, currentDifficulty) {
  const savedGame = gameStorageService.getSavedGame(playerId);
  
  // Validate that saved game matches current difficulty
  if (savedGame && savedGame.difficulty === currentDifficulty) {
    return savedGame;
  }
  
  return null;
}

export default useGamePersistence;

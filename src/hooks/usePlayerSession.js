import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameStorageService } from '../services';
import { generatePlayerId } from '../utils';

/**
 * Custom hook for managing player session lifecycle
 * 
 * Handles:
 * - Player ID generation
 * - Session creation and storage
 * - Navigation to game
 * - Session cleanup
 * 
 * This hook encapsulates all player session logic that was previously
 * scattered across page components.
 * 
 * @returns {Object} Player session methods
 * 
 * @example
 * const { startNewSession, getPlayerData, clearSession } = usePlayerSession();
 * const playerId = startNewSession('John', { difficulty: 'medium' });
 * const data = getPlayerData(playerId);
 * clearSession(playerId);
 */
export function usePlayerSession() {
  const navigate = useNavigate();

  /**
   * Start a new player session
   * Creates a new player ID, saves player data, and navigates to game
   * 
   * @param {string} playerName - Player's name
   * @param {Object} gameSettings - Game settings (difficulty, etc.)
   * @returns {string} Generated player ID
   */
  const startNewSession = useCallback((playerName, gameSettings) => {
    const playerId = generatePlayerId();
    
    gameStorageService.savePlayerData(playerId, {
      playerName,
      gameSettings,
    });
    
    navigate(`/game/${playerId}`);
    return playerId;
  }, [navigate]);

  /**
   * Get player data by ID
   * 
   * @param {string} playerId - Player identifier
   * @returns {Object|null} Player data or null if not found
   */
  const getPlayerData = useCallback((playerId) => {
    return gameStorageService.getPlayerData(playerId);
  }, []);

  /**
   * Clear all data for a player session
   * Removes player data, saved game, and results
   * 
   * @param {string} playerId - Player identifier
   */
  const clearSession = useCallback((playerId) => {
    gameStorageService.clearPlayerData(playerId);
  }, []);

  /**
   * Navigate to scores page for a player
   * 
   * @param {string} playerId - Player identifier
   */
  const navigateToScores = useCallback((playerId) => {
    navigate(`/scores/${playerId}`);
  }, [navigate]);

  /**
   * Navigate to start page
   */
  const navigateToStart = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    startNewSession,
    getPlayerData,
    clearSession,
    navigateToScores,
    navigateToStart,
  };
}

export default usePlayerSession;

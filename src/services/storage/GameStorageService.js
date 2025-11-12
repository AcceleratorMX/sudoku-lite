import { storageService } from './StorageService';

/**
 * GameStorageService - Service for managing game-related storage operations
 * 
 * Handles all localStorage operations for:
 * - Player data
 * - Game settings
 * - Saved game state
 * - Game results
 * - Scores leaderboard
 * 
 * @class GameStorageService
 */
class GameStorageService {
  constructor(storage = storageService) {
    this.storage = storage;
  }

  // Storage keys
  static KEYS = {
    PLAYER: (playerId) => `sudoku-player-${playerId}`,
    SAVED_GAME: (playerId) => `sudoku-saved-game-${playerId}`,
    GAME_RESULTS: (playerId) => `sudoku-game-results-${playerId}`,
    GAME_SETTINGS: 'sudoku-game-settings',
    SCORES: 'sudoku-scores',
  };

  /**
   * Get player data by ID
   * @param {string} playerId - Player identifier
   * @returns {Object|null} Player data object or null
   */
  getPlayerData(playerId) {
    return this.storage.get(GameStorageService.KEYS.PLAYER(playerId));
  }

  /**
   * Save player data
   * @param {string} playerId - Player identifier
   * @param {Object} playerData - Player data to save
   * @param {string} playerData.playerName - Player name
   * @param {Object} playerData.gameSettings - Game settings
   * @returns {boolean} Success status
   */
  savePlayerData(playerId, playerData) {
    return this.storage.set(GameStorageService.KEYS.PLAYER(playerId), playerData);
  }

  /**
   * Remove player data
   * @param {string} playerId - Player identifier
   * @returns {boolean} Success status
   */
  removePlayerData(playerId) {
    return this.storage.remove(GameStorageService.KEYS.PLAYER(playerId));
  }

  /**
   * Get saved game state
   * @param {string} playerId - Player identifier
   * @returns {Object|null} Saved game state or null
   */
  getSavedGame(playerId) {
    return this.storage.get(GameStorageService.KEYS.SAVED_GAME(playerId));
  }

  /**
   * Save game progress
   * @param {string} playerId - Player identifier
   * @param {Object} gameState - Game state to save
   * @param {Array} gameState.board - Current board state
   * @param {Object} gameState.stats - Current game statistics
   * @param {number} gameState.time - Elapsed time
   * @param {string} gameState.difficulty - Game difficulty
   * @returns {boolean} Success status
   */
  saveGameProgress(playerId, gameState) {
    const dataToSave = {
      ...gameState,
      timestamp: Date.now(),
    };
    return this.storage.set(GameStorageService.KEYS.SAVED_GAME(playerId), dataToSave);
  }

  /**
   * Remove saved game
   * @param {string} playerId - Player identifier
   * @returns {boolean} Success status
   */
  removeSavedGame(playerId) {
    return this.storage.remove(GameStorageService.KEYS.SAVED_GAME(playerId));
  }

  /**
   * Get game results
   * @param {string} playerId - Player identifier
   * @returns {Object|null} Game results or null
   */
  getGameResults(playerId) {
    return this.storage.get(GameStorageService.KEYS.GAME_RESULTS(playerId));
  }

  /**
   * Save game results
   * @param {string} playerId - Player identifier
   * @param {Object} results - Game results
   * @param {string} results.playerName - Player name
   * @param {number} results.score - Final score
   * @param {number} results.time - Total time in seconds
   * @param {number} results.moves - Total moves
   * @param {number} results.mistakes - Total mistakes
   * @param {string} results.difficulty - Game difficulty
   * @returns {boolean} Success status
   */
  saveGameResults(playerId, results) {
    return this.storage.set(GameStorageService.KEYS.GAME_RESULTS(playerId), results);
  }

  /**
   * Remove game results
   * @param {string} playerId - Player identifier
   * @returns {boolean} Success status
   */
  removeGameResults(playerId) {
    return this.storage.remove(GameStorageService.KEYS.GAME_RESULTS(playerId));
  }

  /**
   * Get game settings
   * @returns {Object|null} Game settings or null
   */
  getGameSettings() {
    return this.storage.get(GameStorageService.KEYS.GAME_SETTINGS);
  }

  /**
   * Save game settings
   * @param {Object} settings - Game settings
   * @param {string} settings.difficulty - Selected difficulty
   * @returns {boolean} Success status
   */
  saveGameSettings(settings) {
    return this.storage.set(GameStorageService.KEYS.GAME_SETTINGS, settings);
  }

  /**
   * Get all scores from leaderboard
   * @returns {Array} Array of score objects
   */
  getAllScores() {
    return this.storage.get(GameStorageService.KEYS.SCORES, []);
  }

  /**
   * Save scores to leaderboard
   * @param {Array} scores - Array of score objects
   * @returns {boolean} Success status
   */
  saveScores(scores) {
    return this.storage.set(GameStorageService.KEYS.SCORES, scores);
  }

  /**
   * Clear all game data for specific player
   * @param {string} playerId - Player identifier
   * @returns {boolean} Success status
   */
  clearPlayerData(playerId) {
    const success = [
      this.removePlayerData(playerId),
      this.removeSavedGame(playerId),
      this.removeGameResults(playerId),
    ];
    return success.every(Boolean);
  }

  /**
   * Clear all game data
   * @returns {boolean} Success status
   */
  clearAllGameData() {
    // Get all keys and filter game-related ones
    const keys = this.storage.keys();
    const gameKeys = keys.filter(key => 
      key.startsWith('sudoku-player-') || 
      key.startsWith('sudoku-saved-game-') || 
      key.startsWith('sudoku-game-results-')
    );
    
    const results = gameKeys.map(key => this.storage.remove(key));
    return results.every(Boolean);
  }
}

// Export singleton instance
export const gameStorageService = new GameStorageService();

// Export class for creating custom instances
export default GameStorageService;

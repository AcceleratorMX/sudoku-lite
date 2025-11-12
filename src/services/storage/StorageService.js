/**
 * StorageService - Abstraction layer for data storage operations
 * 
 * Benefits:
 * - Centralized error handling
 * - Automatic JSON serialization/deserialization
 * - Easy to replace localStorage with another storage
 * - Easy to test (can pass mock storage)
 * 
 * @class StorageService
 */
class StorageService {
  /**
   * @param {Storage} storage - Storage object (defaults to localStorage)
   */
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  /**
   * Get value from storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Parsed value or defaultValue
   */
  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`StorageService: Error reading key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Save value to storage
   * @param {string} key - Storage key
   * @param {*} value - Value to save
   * @returns {boolean} true if successful, false on error
   */
  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`StorageService: Error setting key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove value from storage
   * @param {string} key - Storage key
   * @returns {boolean} true if successful, false on error
   */
  remove(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`StorageService: Error removing key "${key}":`, error);
      return false;
    }
  }

  /**
   * Check if key exists in storage
   * @param {string} key - Storage key
   * @returns {boolean} true if key exists
   */
  has(key) {
    return this.storage.getItem(key) !== null;
  }

  /**
   * Clear entire storage
   * @returns {boolean} true if successful
   */
  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('StorageService: Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Get all keys from storage
   * @returns {string[]} Array of keys
   */
  keys() {
    try {
      return Object.keys(this.storage);
    } catch (error) {
      console.error('StorageService: Error getting keys:', error);
      return [];
    }
  }
}

// Export singleton instance for convenience
export const storageService = new StorageService();

// Export class for creating custom instances
export default StorageService;

/**
 * Generate a unique player ID
 * 
 * Creates a unique identifier by combining:
 * - Current timestamp (base36 encoded)
 * - Random string (base36 encoded)
 * 
 * @returns {string} Unique player ID
 * 
 * @example
 * generatePlayerId() // Returns something like "l8x2k3abc123"
 */
export const generatePlayerId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${random}`;
};

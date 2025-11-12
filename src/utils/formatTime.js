/**
 * Format time in seconds to MM:SS format
 * 
 * @param {number} seconds - Time in seconds to format
 * @returns {string} Formatted time string (e.g., "12:05" for 725 seconds)
 * 
 * @example
 * formatTime(65)   // Returns "1:05"
 * formatTime(125)  // Returns "2:05"
 * formatTime(3661) // Returns "61:01"
 */
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
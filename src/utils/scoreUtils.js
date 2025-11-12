/**
 * Calculate final game score based on performance metrics
 * 
 * Scoring algorithm:
 * - Base score: 1000 points
 * - Time penalty: -1 point per second over 180 seconds (3 minutes)
 * - Moves penalty: -2 points per move over 81 (minimum possible moves)
 * - Mistakes penalty: -50 points per mistake
 * 
 * @param {number} time - Total time in seconds
 * @param {number} moves - Total number of moves
 * @param {number} mistakes - Total number of mistakes
 * @returns {number} Final score (minimum 0)
 */
export function calculateScore(time, moves, mistakes) {
  let score = 1000;
  
  // Time penalty: penalize for taking longer than 3 minutes
  const timeOver180 = Math.max(0, time - 180);
  score -= timeOver180;
  
  // Moves penalty: penalize for making more than 81 moves
  const movesOver81 = Math.max(0, moves - 81);
  score -= movesOver81 * 2;
  
  // Mistakes penalty: heavy penalty for mistakes
  score -= mistakes * 50;
  
  // Ensure score is never negative
  return Math.max(0, score);
}

/**
 * Get score grade based on final score
 * 
 * @param {number} score - Final score
 * @returns {string} Grade label
 */
export function getScoreGrade(score) {
  if (score >= 900) return "Excellent!";
  if (score >= 700) return "Great!";
  if (score >= 500) return "Good!";
  return "Try Again!";
}

/**
 * Get score color class based on final score
 * 
 * @param {number} score - Final score
 * @returns {string} Color class name
 */
export function getScoreColor(score) {
  if (score >= 900) return "excellent";
  if (score >= 700) return "great";
  if (score >= 500) return "good";
  return "poor";
}

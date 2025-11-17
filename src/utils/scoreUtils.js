import { 
  TIME_STATUS, 
  TIME_THRESHOLDS, 
  MOVES_STATUS, 
  MOVES_THRESHOLDS, 
  GRADE_STATUS,
  SCORE_THRESHOLDS 
} from '../constants';

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
  const timeOver180 = Math.max(0, time - TIME_THRESHOLDS.DANGER);
  score -= timeOver180;
  
  // Moves penalty: penalize for making more than 81 moves
  const movesOver81 = Math.max(0, moves - MOVES_THRESHOLDS.DANGER);
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
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return "Excellent!";
  if (score >= SCORE_THRESHOLDS.GREAT) return "Great!";
  if (score >= SCORE_THRESHOLDS.GOOD) return "Good!";
  return "Try Again!";
}

/**
 * Get score color class based on final score
 * 
 * @param {number} score - Final score
 * @returns {string} Color class name
 */
export function getScoreColor(score) {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return "excellent";
  if (score >= SCORE_THRESHOLDS.GREAT) return "great";
  if (score >= SCORE_THRESHOLDS.GOOD) return "good";
  return "poor";
}

/**
 * Get time status based on elapsed time
 * @param {number} time - Time in seconds
 * @returns {string} Status: 'normal' | 'warning' | 'danger'
 */
export function getTimeStatus(time) {
  if (time >= TIME_THRESHOLDS.DANGER) return TIME_STATUS.DANGER;
  if (time >= TIME_THRESHOLDS.WARNING) return TIME_STATUS.WARNING;
  return TIME_STATUS.NORMAL;
}

/**
 * Get moves status based on number of moves
 * @param {number} moves - Number of moves
 * @returns {string} Status: 'normal' | 'danger'
 */
export function getMovesStatus(moves) {
  if (moves > MOVES_THRESHOLDS.DANGER) return MOVES_STATUS.DANGER;
  return MOVES_STATUS.NORMAL;
}

/**
 * Get grade status for styling
 * @param {string} grade - Grade label
 * @returns {string} Status: 'success' | 'warning' | 'danger'
 */
export function getGradeStatus(grade) {
  if (grade === "Excellent!" || grade === "Great!") return GRADE_STATUS.SUCCESS;
  if (grade === "Good!") return GRADE_STATUS.WARNING;
  return GRADE_STATUS.DANGER;
}

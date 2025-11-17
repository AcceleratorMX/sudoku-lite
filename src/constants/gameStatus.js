/**
 * Game Status Constants
 * 
 * Constants for game performance status indicators
 */

/**
 * Time status thresholds and values
 */
export const TIME_STATUS = {
  NORMAL: 'normal',
  WARNING: 'warning',
  DANGER: 'danger',
};


/** 
 * Time thresholds in seconds
 */
export const TIME_THRESHOLDS = {
  WARNING: 120,
  DANGER: 180,
};

/**
 * Moves status thresholds and values
 */
export const MOVES_STATUS = {
  NORMAL: 'normal',
  DANGER: 'danger',
};

/**
 * Minimum possible moves for perfect solution
 * 
 */
export const MOVES_THRESHOLDS = {
  DANGER: 81,
};

/**
 * Grade status values
 */
export const GRADE_STATUS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
};

/**
 * Score thresholds for grades
 */
export const SCORE_THRESHOLDS = {
  EXCELLENT: 900,
  GREAT: 700,
  GOOD: 500,
};

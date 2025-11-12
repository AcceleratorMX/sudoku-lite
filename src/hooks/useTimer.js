import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for managing a game timer
 * 
 * Features:
 * - Counts up in seconds
 * - Can be activated/deactivated
 * - Supports initial time for resuming games
 * - Provides reset, pause, and restore methods
 * - Automatically cleans up intervals
 * 
 * @param {boolean} isActive - Whether the timer should be running
 * @param {number} initialTime - Initial time in seconds (for restoring saved games)
 * @returns {Object} Timer state and control methods
 * @returns {number} returns.time - Current time in seconds
 * @returns {Function} returns.reset - Reset timer to 0
 * @returns {Function} returns.pause - Pause the timer
 * @returns {Function} returns.restore - Restore timer to a specific time
 * 
 * @example
 * const { time, reset, pause, restore } = useTimer(true, 0);
 * console.log(time); // Current seconds elapsed
 * reset(); // Set time back to 0
 * pause(); // Stop the timer
 * restore(120); // Set time to 120 seconds
 */
const useTimer = (isActive = false, initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  /**
   * Reset timer to 0 seconds
   */
  const reset = () => {
    setTime(0);
  };

  /**
   * Pause the timer by clearing the interval
   */
  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  /**
   * Restore timer to a specific time (for resuming saved games)
   * @param {number} savedTime - Time in seconds to restore
   */
  const restore = (savedTime) => {
    setTime(savedTime);
  };

  return {
    time,
    reset,
    pause,
    restore,
  };
};

export default useTimer;

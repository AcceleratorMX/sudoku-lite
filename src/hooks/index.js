/**
 * Hooks barrel export
 * 
 * Centralizes all custom React hooks for easy importing.
 * Hooks provide reusable stateful logic for components.
 * 
 * Note: Global state management hooks have been migrated to Zustand stores.
 * See src/stores for useGameStore, useScoresStore, usePlayerStore.
 */

export { default as useTimer } from './useTimer';
export { default as useSudokuBoard } from './useSudokuBoard';
export { default as useGameStats } from './useGameStats';
export { default as useGamePersistence, useLoadSavedGame } from './useGamePersistence';

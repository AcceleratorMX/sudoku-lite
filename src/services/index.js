/**
 * Services barrel export
 * 
 * Centralizes all service layer exports for easy importing.
 * Services provide business logic and handle data operations.
 */

// Storage services
export { default as StorageService, storageService } from './storage/StorageService';
export { default as GameStorageService, gameStorageService } from './storage/GameStorageService';

// Sudoku services
export { 
  generateSolvedBoard, 
  generatePuzzleBoard, 
  validateCellPlacement 
} from './sudoku/SudokuGenerator';
export { default as SudokuGenerator } from './sudoku/SudokuGenerator';

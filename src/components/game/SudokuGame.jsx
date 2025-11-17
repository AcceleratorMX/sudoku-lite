import { useEffect } from "react";
import { Grid, GameCompletionDialog, GameHeader, GameControls, PauseOverlay } from "../index";
import { useTimer, useSudokuBoard, useGameStats } from "../../hooks";
import { useGameStore, usePlayerStore } from "../../stores";
import { formatTime, calculateScore, classNames } from "../../utils";
import { DIFFICULTY_SETTINGS } from "../../constants";
import { SudokuGame as styles } from "../../css";

/**
 * SudokuGame Component
 * 
 * Main game component that orchestrates the Sudoku game logic.
 * Manages game state, board operations, timer, statistics, and user interactions.
 * Handles game persistence, pause/resume functionality, and completion flow.
 * 
 * Now gets player data directly from Zustand stores (no props drilling!)
 * 
 * @param {Object} props - Component props
 * @param {string} props.playerId - Player ID to load data from stores
 * @param {Function} props.onSaveProgress - Callback to save game progress
 * @param {Function} props.onGameComplete - Callback when game is completed
 * @param {Function} props.onBackToStart - Callback to return to start screen
 * @param {string} [props.className=""] - Additional CSS class names
 * @returns {JSX.Element} SudokuGame component
 */
const SudokuGame = ({
  playerId,
  onSaveProgress,
  onGameComplete,
  onBackToStart,
  className = "",
}) => {
  const playerData = usePlayerStore((state) => state.getPlayerData(playerId));
  const savedGame = useGameStore((state) => state.getSavedGame(playerId));
  const gameSettings = useGameStore((state) => state.gameSettings);
  
  // Try to get playerName from multiple sources (savedGame first, then playerData)
  const playerName = savedGame?.playerName || playerData?.playerName || "Player";
  const difficulty = gameSettings?.difficulty || "medium";
  const difficultyLabel = DIFFICULTY_SETTINGS[difficulty]?.label || "Medium";

  // Check if saved game is valid - it's valid if it exists and has matching difficulty
  const validSavedGame =
    savedGame && 
    savedGame.board && 
    (savedGame.difficulty === difficulty || !savedGame.difficulty)
      ? savedGame
      : null;

  const {
    board,
    updateCell,
    isBoardComplete,
    isValidPlacement,
    newGame,
    restoreBoard,
  } = useSudokuBoard(difficulty, validSavedGame?.board);

  const {
    stats,
    incrementMoves,
    incrementMistakes,
    completeGame,
    togglePause,
    resetStats,
    restoreStats,
  } = useGameStats(validSavedGame?.stats);

  const {
    time,
    reset: resetTimer,
    restore: restoreTimer,
  } = useTimer(
    !stats.isPaused && !stats.isCompleted,
    validSavedGame?.time || 0
  );

  // Restore saved game on mount
  useEffect(() => {
    if (validSavedGame) {
      if (validSavedGame.board) restoreBoard(validSavedGame.board);
      if (validSavedGame.stats) restoreStats(validSavedGame.stats);
      if (validSavedGame.time !== undefined) restoreTimer(validSavedGame.time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save game progress with debounce
  useEffect(() => {
    if (stats.isCompleted || !onSaveProgress || !board) return;
    
    const timeoutId = setTimeout(() => {
      onSaveProgress(board, stats, time);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [board, stats, time, stats.isCompleted, onSaveProgress]);

  // Check for game completion
  useEffect(() => {
    if (isBoardComplete() && !stats.isCompleted) {
      completeGame();
    }
  }, [board, isBoardComplete, stats.isCompleted, completeGame]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    if (stats.isCompleted || stats.isPaused) return;

    const isValid = isValidPlacement(rowIndex, colIndex, value);
    updateCell(rowIndex, colIndex, value);
    incrementMoves();

    if (!isValid && value !== "") {
      incrementMistakes();
    }
  };

  const handleNewGame = () => {
    newGame();
    resetStats();
    resetTimer();
    onSaveProgress?.(null, null, 0);
  };

  const handleViewResults = () => {
    const finalScore = calculateScore(time, stats.moves, stats.mistakes);
    onGameComplete({
      playerName,
      score: finalScore,
      time,
      moves: stats.moves,
      mistakes: stats.mistakes,
      difficulty: difficultyLabel,
    });
  };

  return (
    <div className={classNames(styles.game, className)}>
      <GameHeader
        playerName={playerName}
        difficulty={difficultyLabel}
        moves={stats.moves}
        time={time}
        mistakes={stats.mistakes}
        isPaused={stats.isPaused}
        isCompleted={stats.isCompleted}
        onPause={togglePause}
        onReset={handleNewGame}
      />

      <PauseOverlay isVisible={stats.isPaused && !stats.isCompleted} />

      <GameCompletionDialog
        isOpen={stats.isCompleted}
        playerName={playerName}
        difficulty={difficultyLabel}
        time={formatTime(time)}
        errors={stats.mistakes}
        onPlayAgain={handleNewGame}
        onRestart={handleNewGame}
        onViewResults={handleViewResults}
      />

      <div className={styles.grid}>
        <Grid
          board={board}
          onCellChange={handleCellChange}
          disabled={stats.isPaused || stats.isCompleted}
        />
      </div>

      <GameControls onExit={onBackToStart} />
    </div>
  );
};

export default SudokuGame;

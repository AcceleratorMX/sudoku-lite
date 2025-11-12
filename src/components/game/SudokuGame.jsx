import { useEffect } from "react";
import { Grid, GameCompletionDialog, GameHeader, GameControls, PauseOverlay } from "../index";
import { useTimer, useSudokuBoard, useGameStats } from "../../hooks";
import { formatTime } from "../../utils/formatTime";
import { calculateScore } from "../../utils/score";
import { DIFFICULTY_SETTINGS } from "../../constants";
import { SudokuGame as styles } from "../../css";

/**
 * SudokuGame Component
 * 
 * Main game component that orchestrates the Sudoku game logic.
 * Manages game state, board operations, timer, statistics, and user interactions.
 * Handles game persistence, pause/resume functionality, and completion flow.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.playerName="Player"] - The name of the player
 * @param {Object} props.gameSettings - Game configuration settings
 * @param {string} props.gameSettings.difficulty - Difficulty level (easy/medium/hard)
 * @param {Object|null} props.savedGame - Previously saved game state to restore
 * @param {Function} props.onSaveProgress - Callback to save game progress
 * @param {Function} props.onGameComplete - Callback when game is completed
 * @param {Function} props.onBackToStart - Callback to return to start screen
 * @param {string} [props.className=""] - Additional CSS class names
 * @returns {JSX.Element} SudokuGame component
 */
const SudokuGame = ({
  playerName = "Player",
  gameSettings,
  savedGame,
  onSaveProgress,
  onGameComplete,
  onBackToStart,
  className = "",
}) => {
  const difficulty = gameSettings?.difficulty || "medium";
  const difficultyLabel = DIFFICULTY_SETTINGS[difficulty]?.label || "Medium";

  const validSavedGame =
    savedGame && savedGame.difficulty === difficulty ? savedGame : null;

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

  useEffect(() => {
    if (validSavedGame) {
      if (validSavedGame.board) {
        restoreBoard(validSavedGame.board);
      }
      if (validSavedGame.stats) {
        restoreStats(validSavedGame.stats);
      }
      if (validSavedGame.time !== undefined) {
        restoreTimer(validSavedGame.time);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!stats.isCompleted && onSaveProgress && board) {
      const timeoutId = setTimeout(() => {
        onSaveProgress(board, stats, time);
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [board, stats, time, stats.isCompleted, onSaveProgress]);

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
    if (onSaveProgress) {
      onSaveProgress(null, null, 0);
    }
  };

  const handlePause = () => {
    togglePause();
  };

  const handlePlayAgain = () => {
    handleNewGame();
  };

  const handleRestart = () => {
    handleNewGame();
  };

  const handleViewResults = () => {
    const finalScore = calculateScore(time, stats.moves, stats.mistakes);
    onGameComplete({
      playerName: playerName,
      score: finalScore,
      time: time,
      moves: stats.moves,
      mistakes: stats.mistakes,
      difficulty: difficultyLabel,
    });
  };

  const rootClassName = [styles.game, className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <GameHeader
        playerName={playerName}
        difficulty={difficultyLabel}
        moves={stats.moves}
        time={time}
        mistakes={stats.mistakes}
        isPaused={stats.isPaused}
        isCompleted={stats.isCompleted}
        onPause={handlePause}
        onReset={handleNewGame}
      />

      <PauseOverlay isVisible={stats.isPaused && !stats.isCompleted} />

      <GameCompletionDialog
        isOpen={stats.isCompleted}
        playerName={playerName}
        difficulty={difficultyLabel}
        time={formatTime(time)}
        errors={stats.mistakes}
        onPlayAgain={handlePlayAgain}
        onRestart={handleRestart}
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

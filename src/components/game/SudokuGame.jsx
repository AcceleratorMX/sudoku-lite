import { useEffect } from "react";
import { Grid, Button, GameCompletionDialog } from "../index.jsx";
import { useTimer, useSudokuBoard, useGameStats } from "../../hooks";
import { formatTime } from "../../utils/formatTime";
import { calculateScore } from "../../utils/score";
import { DIFFICULTY_SETTINGS } from "../../constants";
import { SudokuGame as styles } from "../../css";

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
      <div className={styles.header}>
        <div className={styles.info}>
          <span className={styles.player}>{playerName}</span>
          <span className={styles.difficulty}>{difficultyLabel}</span>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Moves</span>
            <span className={styles.statValue}>{stats.moves}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Time</span>
            <span className={styles.statValue}>{formatTime(time)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Mistakes</span>
            <span className={styles.statValue}>{stats.mistakes}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="small"
            onClick={handlePause}
            disabled={stats.isCompleted}
          >
            {stats.isPaused ? "Resume" : "Pause"}
          </Button>
          <Button variant="primary" size="small" onClick={handleNewGame}>
            Reset
          </Button>
        </div>
      </div>

      {stats.isPaused && !stats.isCompleted && (
        <div className={styles.pauseOverlay}>
          <div className={styles.pauseMessage}>Game Paused</div>
        </div>
      )}

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

      <div className={styles.controls}>
        <Button variant="secondary" size="medium" onClick={onBackToStart}>
          Exit
        </Button>
      </div>
    </div>
  );
};

export default SudokuGame;

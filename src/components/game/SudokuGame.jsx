import { useEffect } from "react";
import { Grid, Button, GameCompletionDialog } from "../index.jsx";
import { useTimer, useSudokuBoard, useGameStats } from "../../hooks";
import { formatTime } from "../../utils/formatTime";
import { DIFFICULTY_SETTINGS } from "../../constants";

const SudokuGame = ({
  playerName = "Player",
  gameSettings,
  onGameComplete,
  onBackToStart,
  className = "",
}) => {
  const difficulty = gameSettings?.difficulty || "medium";
  const difficultyLabel = DIFFICULTY_SETTINGS[difficulty]?.label || "Medium";
  const { board, updateCell, isBoardComplete, isValidPlacement, newGame } =
    useSudokuBoard(difficulty);
  const {
    stats,
    incrementMoves,
    incrementMistakes,
    calculateFinalScore,
    completeGame,
    togglePause,
    resetStats,
  } = useGameStats();
  const { time, reset: resetTimer } = useTimer(
    !stats.isPaused && !stats.isCompleted
  );

  useEffect(() => {
    if (isBoardComplete() && !stats.isCompleted) {
      completeGame();
      // Не викликаємо onGameComplete тут - тільки при натисканні "View Results"
    }
  }, [
    board,
    isBoardComplete,
    stats.isCompleted,
    completeGame,
  ]);

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
    const finalScore = calculateFinalScore(time, stats.moves, stats.mistakes);
    onGameComplete({
      playerName: playerName,
      score: finalScore,
      time: time,
      moves: stats.moves,
      mistakes: stats.mistakes,
      difficulty: difficultyLabel,
    });
  };

  return (
    <div className={`sudoku-game ${className}`}>
      <div className="sudoku-game__header">
        <div className="sudoku-game__info">
          <span className="sudoku-game__player">{playerName}</span>
          <span className="sudoku-game__difficulty">{difficultyLabel}</span>
        </div>

        <div className="sudoku-game__stats">
          <div className="sudoku-game__stat">
            <span className="sudoku-game__stat-label">Moves</span>
            <span className="sudoku-game__stat-value">{stats.moves}</span>
          </div>
          <div className="sudoku-game__stat">
            <span className="sudoku-game__stat-label">Time</span>
            <span className="sudoku-game__stat-value">{formatTime(time)}</span>
          </div>
          <div className="sudoku-game__stat">
            <span className="sudoku-game__stat-label">Mistakes</span>
            <span className="sudoku-game__stat-value">{stats.mistakes}</span>
          </div>
        </div>

        <div className="sudoku-game__actions">
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
        <div className="sudoku-game__pause-overlay">
          <div className="sudoku-game__pause-message">Game Paused</div>
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

      <div className="sudoku-game__grid">
        <Grid
          board={board}
          onCellChange={handleCellChange}
          disabled={stats.isPaused || stats.isCompleted}
        />
      </div>

      <div className="sudoku-game__controls">
        <Button variant="secondary" size="medium" onClick={onBackToStart}>
          Exit
        </Button>
      </div>
    </div>
  );
};

export default SudokuGame;

import { useEffect } from 'react';
import { Grid, Button } from '../index.jsx';
import { useTimer, useSudokuBoard, useGameStats } from '../../hooks';
import { formatTime } from '../../utils/formatTime';

const SudokuGame = ({
    playerName = 'Player',
    onGameComplete,
    onBackToStart,
    className = ''
}) => {
    // Використовуємо кастомні хуки
    const { board, updateCell, isBoardComplete, isValidPlacement, newGame } = useSudokuBoard();
    const { 
        stats, 
        incrementMoves, 
        incrementMistakes, 
        calculateFinalScore, 
        completeGame, 
        togglePause, 
        resetStats 
    } = useGameStats();
    const { time, reset: resetTimer } = useTimer(!stats.isPaused && !stats.isCompleted);

    useEffect(() => {
        if (isBoardComplete() && !stats.isCompleted) {
            completeGame();
            
            if (onGameComplete) {
                const finalScore = calculateFinalScore(time, stats.moves, stats.mistakes);
                onGameComplete({
                    playerName: playerName,
                    score: finalScore,
                    time: time,
                    moves: stats.moves,
                    mistakes: stats.mistakes,
                    difficulty: 'Medium'
                });
            }
        }
    }, [board, isBoardComplete, stats.isCompleted, completeGame, onGameComplete, calculateFinalScore, time, stats.moves, stats.mistakes, playerName]);

    const handleCellChange = (rowIndex, colIndex, value) => {
        if (stats.isCompleted || stats.isPaused) return;

        const isValid = isValidPlacement(rowIndex, colIndex, value);
        
 
        updateCell(rowIndex, colIndex, value);
        
        
        incrementMoves();
        
        if (!isValid && value !== '') {
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

    return (
        <div className={`sudoku-game ${className}`}>
            <div className="sudoku-game__header">
                <div className="sudoku-game__player-info">
                    <h2 className="sudoku-game__player-name">
                        Player: {playerName}
                    </h2>
                </div>
                
                <div className="sudoku-game__stats">
                    <div className="sudoku-game__stat">
                        <span className="sudoku-game__stat-label">Moves:</span>
                        <span className="sudoku-game__stat-value">{stats.moves}</span>
                    </div>
                    <div className="sudoku-game__stat">
                        <span className="sudoku-game__stat-label">Time:</span>
                        <span className="sudoku-game__stat-value">
                            {formatTime(time)}
                        </span>
                    </div>
                    <div className="sudoku-game__stat">
                        <span className="sudoku-game__stat-label">Mistakes:</span>
                        <span className="sudoku-game__stat-value">{stats.mistakes}</span>
                    </div>
                </div>

                <div className="sudoku-game__actions">
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={handlePause}
                        disabled={stats.isCompleted}
                    >
                        {stats.isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                        variant="primary"
                        size="medium"
                        onClick={handleNewGame}
                    >
                        New Game
                    </Button>
                </div>
            </div>

            {stats.isPaused && !stats.isCompleted && (
                <div className="sudoku-game__pause-overlay">
                    <div className="sudoku-game__pause-message">
                        Game Paused
                    </div>
                </div>
            )}

            {stats.isCompleted && (
                <div className="sudoku-game__completion">
                    🎉 Congratulations! You completed the puzzle in {stats.moves} moves!
                </div>
            )}
            
            <div className="sudoku-game__grid">
                <Grid 
                    board={board}
                    onCellChange={handleCellChange} 
                    disabled={stats.isPaused || stats.isCompleted}
                />
            </div>

            <div className="sudoku-game__controls">
                <Button
                    variant="secondary"
                    size="large"
                    onClick={onBackToStart}
                >
                    Exit
                </Button>
                
                {stats.isCompleted && (
                    <Button
                        variant="success"
                        size="large"
                        onClick={() => {
                            const finalScore = calculateFinalScore(time, stats.moves, stats.mistakes);
                            onGameComplete({
                                playerName: playerName,
                                score: finalScore,
                                time: time,
                                moves: stats.moves,
                                mistakes: stats.mistakes,
                                difficulty: 'Medium'
                            });
                        }}
                    >
                        View Results
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SudokuGame;
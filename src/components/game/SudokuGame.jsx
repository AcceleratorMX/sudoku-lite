import { useState } from 'react';
import { Grid, Button } from '../index.jsx';

const SudokuGame = ({
    playerName = 'Player',
    onGameComplete,
    onBackToStart,
    className = ''
}) => {
    const [gameStats, setGameStats] = useState({
        moves: 0,
        timeElapsed: 0,
        isCompleted: false
    });

    const handleCellChange = (rowIndex, colIndex, value) => {
        console.log(`Cell changed: [${rowIndex}, ${colIndex}] = ${value}`);

        setGameStats(prev => ({
            ...prev,
            moves: prev.moves + 1
        }));
    };

    const handleNewGame = () => {
        console.log('Starting new game...');
        setGameStats({
            moves: 0,
            timeElapsed: 0,
            isCompleted: false
        });
    };

    const handlePause = () => {
        console.log('Game paused/resumed');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                        <span className="sudoku-game__stat-value">{gameStats.moves}</span>
                    </div>
                    <div className="sudoku-game__stat">
                        <span className="sudoku-game__stat-label">Time:</span>
                        <span className="sudoku-game__stat-value">
                            {formatTime(gameStats.timeElapsed)}
                        </span>
                    </div>
                </div>

                <div className="sudoku-game__actions">
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={handlePause}
                    >
                        Pause
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

            {gameStats.isCompleted && (
                <div className="sudoku-game__completion">
                    🎉 Congratulations! You completed the puzzle in {gameStats.moves} moves!
                </div>
            )}
            
            <div className="sudoku-game__grid">
                <Grid onCellChange={handleCellChange} />
            </div>

            <div className="sudoku-game__controls">
                <Button
                    variant="secondary"
                    size="large"
                    onClick={onBackToStart}
                >
                    Exit
                </Button>
                
                {gameStats.isCompleted && (
                    <Button
                        variant="success"
                        size="large"
                        onClick={onGameComplete}
                    >
                        View Results
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SudokuGame;
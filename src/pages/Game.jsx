import { SudokuGame } from '../components/index.jsx';

const Game = ({ onGameComplete, onBackToStart, playerName }) => {
    const handleGameComplete = (gameResults) => {
        if (onGameComplete) {
            onGameComplete(gameResults);
        }
    };

    const handleBackToStart = () => {
        if (onBackToStart) {
            onBackToStart();
        }
    };

    return (
        <div className="game-page">
            <div className="game-page__container">
                <SudokuGame
                    playerName={playerName || 'Player'}
                    onGameComplete={handleGameComplete}
                    onBackToStart={handleBackToStart}
                    className="game-page__sudoku"
                />
            </div>
        </div>
    );
};

export default Game;
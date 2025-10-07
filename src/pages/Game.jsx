import { SudokuGame } from '../components/index.jsx';

const Game = ({ onGameComplete, onBackToStart, playerData }) => {
    const handleGameComplete = () => {

        const gameResults = {
            playerName: playerData?.playerName || 'Player',
            score: Math.floor(Math.random() * 1000) + 500,
            time: Math.floor(Math.random() * 600) + 180,
            moves: Math.floor(Math.random() * 100) + 50,
            difficulty: 'Medium'
        };
        
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
                    playerName={playerData?.playerName || 'Player'}
                    onGameComplete={handleGameComplete}
                    onBackToStart={handleBackToStart}
                    className="game-page__sudoku"
                />
            </div>
        </div>
    );
};

export default Game;
import { SudokuGame } from "../components/index.jsx";

const Game = ({ onGameComplete, onBackToStart, playerName, gameSettings }) => {
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
          playerName={playerName || "Player"}
          gameSettings={gameSettings}
          onGameComplete={handleGameComplete}
          onBackToStart={handleBackToStart}
          className="game-page__sudoku"
        />
      </div>
    </div>
  );
};

export default Game;

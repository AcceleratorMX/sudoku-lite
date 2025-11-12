import { useParams, useNavigate } from "react-router-dom";
import { SudokuGame } from "../components/index.jsx";
import { Game as styles } from "../css";

const Game = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  
  const playerDataStr = localStorage.getItem(`sudoku-player-${playerId}`);
  const playerData = playerDataStr ? JSON.parse(playerDataStr) : {
    playerName: "Player",
    gameSettings: { difficulty: "medium" }
  };
  
  const savedGameStr = localStorage.getItem(`sudoku-saved-game-${playerId}`);
  const savedGame = savedGameStr ? JSON.parse(savedGameStr) : null;

  const handleGameComplete = (gameResults) => {
    localStorage.setItem(`sudoku-game-results-${playerId}`, JSON.stringify(gameResults));
    
    localStorage.removeItem(`sudoku-saved-game-${playerId}`);
    
    // Перейти до сторінки результатів
    navigate(`/scores/${playerId}`);
  };

  const handleBackToStart = () => {
    localStorage.removeItem(`sudoku-saved-game-${playerId}`);
    navigate("/");
  };
  
  const handleSaveProgress = (board, stats, time) => {
    if (board === null) {
      localStorage.removeItem(`sudoku-saved-game-${playerId}`);
    } else {
      localStorage.setItem(`sudoku-saved-game-${playerId}`, JSON.stringify({
        board,
        stats,
        time,
        difficulty: playerData.gameSettings?.difficulty,
        timestamp: Date.now()
      }));
    }
  };

  return (
    <div className={styles.gamePage}>
      <div className={styles.container}>
        <SudokuGame
          playerName={playerData.playerName}
          gameSettings={playerData.gameSettings}
          savedGame={savedGame}
          onSaveProgress={handleSaveProgress}
          onGameComplete={handleGameComplete}
          onBackToStart={handleBackToStart}
          className={styles.sudoku}
        />
      </div>
    </div>
  );
};

export default Game;

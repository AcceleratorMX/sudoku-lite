import { useState } from "react";
import "./css/App.css";
import { Start, Game, Scores } from "./pages/index.jsx";
import { APP_STATES } from "./constants";
import { useGameState } from "./hooks";

function App() {
  const { savedState, saveGameState, clearGameState } = useGameState();
  
  const [currentPage, setCurrentPage] = useState(savedState.currentPage);
  const [playerData, setPlayerData] = useState(savedState.playerData);
  const [gameResults, setGameResults] = useState(savedState.gameResults);

  // Видалимо цей useEffect - він викликає нескінченний цикл
  // Замість цього будемо зберігати стан тільки коли він реально змінюється

  const handleStartGame = (playerName, gameSettings) => {
    const newPlayerData = {
      playerName: playerName,
      gameSettings: gameSettings,
    };
    setPlayerData(newPlayerData);
    setCurrentPage(APP_STATES.GAME);
    // Очистити збережену гру при запуску нової
    saveGameState(APP_STATES.GAME, newPlayerData, null, null);
  };

  const handleGameComplete = (results) => {
    const newGameResults = results;
    setGameResults(newGameResults);
    setCurrentPage(APP_STATES.SCORES);
    saveGameState(APP_STATES.SCORES, playerData, newGameResults, null);
  };

  const handleBackToStart = () => {
    setCurrentPage(APP_STATES.START);
    setGameResults(null);
    clearGameState();
  };

  const handlePlayAgain = () => {
    setCurrentPage(APP_STATES.GAME);
    setGameResults(null);
    saveGameState(APP_STATES.GAME, playerData, null, null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case APP_STATES.START:
        return <Start onStartGame={handleStartGame} />;

      case APP_STATES.GAME:
        return (
          <Game
            onGameComplete={handleGameComplete}
            onBackToStart={handleBackToStart}
            playerName={playerData.playerName}
            gameSettings={playerData.gameSettings}
            savedGame={savedState.savedGame}
            onSaveProgress={(board, stats, time) => {
              // Якщо board === null, очистити збережену гру
              if (board === null) {
                saveGameState(currentPage, playerData, gameResults, null);
              } else {
                saveGameState(currentPage, playerData, gameResults, {
                  board,
                  stats,
                  time,
                  difficulty: playerData.gameSettings?.difficulty,
                  timestamp: Date.now()
                });
              }
            }}
          />
        );

      case APP_STATES.SCORES:
        return (
          <Scores
            onPlayAgain={handlePlayAgain}
            onBackToStart={handleBackToStart}
            gameResults={gameResults}
          />
        );

      default:
        return <Start onStartGame={handleStartGame} />;
    }
  };

  return (
    <>
      <div className="app">{renderCurrentPage()}</div>
    </>
  );
}

export default App;

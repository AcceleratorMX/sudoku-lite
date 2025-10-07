import {useState} from 'react';
import './css/App.css';
import {Start, Game, Scores} from './pages/index.jsx';
import { APP_STATES } from './constants'

function App() {
    const [currentPage, setCurrentPage] = useState(APP_STATES.START);
    const [playerData, setPlayerData] = useState({
        playerName: ''
    });

    const handleStartGame = (playerName) => {
        setPlayerData({
            ...playerData,
            playerName: playerName
        });
        setCurrentPage(APP_STATES.GAME);
    };

    const handleGameComplete = () => {
        setCurrentPage(APP_STATES.SCORES);
    };

    const handleBackToStart = () => {
        setCurrentPage(APP_STATES.START);
    };

    const handlePlayAgain = () => {
        setCurrentPage(APP_STATES.GAME);
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case APP_STATES.START:
                return <Start onStartGame={handleStartGame}/>;

            case APP_STATES.GAME:
                return (
                    <Game
                        onGameComplete={handleGameComplete}
                        onBackToStart={handleBackToStart}
                        playerName={playerData.playerName}
                    />
                );

            case APP_STATES.SCORES:
                return (
                    <Scores
                        onPlayAgain={handlePlayAgain}
                        onBackToStart={handleBackToStart}
                    />
                );

            default:
                return <Start onStartGame={handleStartGame}/>;
        }
    };

    return (
        <>
            <div className="app">
                {renderCurrentPage()}
            </div>
        </>
    )
}

export default App

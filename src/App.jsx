import {useState} from 'react';
import './css/App.css';
import {Start, Game, Scores} from './pages/index.jsx';

const APP_STATES = {
    START: 'start',
    GAME: 'game',
    SCORES: 'scores',
};

function App() {
    const [currentPage, setCurrentPage] = useState(APP_STATES.START);

    const handleStartGame = () => {
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

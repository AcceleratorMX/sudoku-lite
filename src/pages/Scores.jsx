import {Button, ScoresList} from '../components/index.jsx';
import {formatTime} from "../utils/formatTime.js";

const Scores = ({onPlayAgain, onBackToStart, gameResults}) => {
    const results = gameResults || {
        playerName: 'Player',
        score: 750,
        time: 245,
        moves: 67,
        difficulty: 'Medium'
    };

    const getScoreGrade = (score) => {
        if (score >= 900) return 'Excellent!';
        if (score >= 700) return 'Great!';
        if (score >= 500) return 'Good!';
        return 'Try Again!';
    };

    const topPlayers = [
        {id: 1, rank: 1, name: 'Alex', score: 950},
        {id: 2, rank: 2, name: 'Sam', score: 890},
        {id: 3, rank: 3, name: 'Jordan', score: 820}
    ];

    const currentPlayer = {
        id: 4,
        rank: 56,
        name: results.playerName,
        score: results.score
    };

    return (
        <div className="scores-page">
            <div className="scores-page__container">
                <h1 className="scores-page__title">Game Completed!</h1>

                <div className="scores-page__results">
                    <div className="scores-page__player">
                        <h2 className="scores-page__player-name">{results.playerName}</h2>
                        <div className="scores-page__grade">{getScoreGrade(results.score)}</div>
                    </div>

                    <div className="scores-page__stats">
                        <div className="scores-page__stat-group">
                            <div className="scores-page__stat">
                                <span className="scores-page__stat-label">Final Score</span>
                                <span className="scores-page__stat-value scores-page__stat-value--primary">
                                    {results.score}
                                </span>
                            </div>

                            <div className="scores-page__stat">
                                <span className="scores-page__stat-label">Time</span>
                                <span className="scores-page__stat-value">
                                    {formatTime(results.time)}
                                </span>
                            </div>

                            <div className="scores-page__stat">
                                <span className="scores-page__stat-label">Moves</span>
                                <span className="scores-page__stat-value">
                                    {results.moves}
                                </span>
                            </div>

                            <div className="scores-page__stat">
                                <span className="scores-page__stat-label">Difficulty</span>
                                <span className="scores-page__stat-value">
                                    {results.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="scores-page__actions">
                    <Button
                        variant="primary"
                        size="large"
                        onClick={onPlayAgain}
                        className="scores-page__action-button"
                    >
                        Play Again
                    </Button>

                    <Button
                        variant="secondary"
                        size="large"
                        onClick={onBackToStart}
                        className="scores-page__action-button"
                    >
                        Exit
                    </Button>
                </div>

                <ScoresList
                    title="Top Scores"
                    players={topPlayers}
                    currentPlayer={currentPlayer}
                    showCurrentUserSeparately={true}
                />
            </div>
        </div>
    );
};

export default Scores;

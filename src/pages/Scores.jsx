import { useEffect, useState } from 'react';
import {Button, ScoresList} from '../components/index.jsx';
import {formatTime} from "../utils/formatTime.js";
import { useLocalStorage } from '../hooks';

const Scores = ({onPlayAgain, onBackToStart, gameResults}) => {
    const [allScores, setAllScores] = useLocalStorage('sudoku-scores', []);
    const [currentPlayerRank, setCurrentPlayerRank] = useState(null);

    const results = gameResults || {
        playerName: 'Player',
        score: 750,
        time: 245,
        moves: 67,
        mistakes: 0,
        difficulty: 'Medium'
    };

    useEffect(() => {
        if (gameResults) {
            const newScore = {
                id: Date.now(),
                name: results.playerName,
                score: results.score,
                time: results.time,
                moves: results.moves,
                mistakes: results.mistakes,
                difficulty: results.difficulty,
                date: new Date().toISOString()
            };

            const updatedScores = [...allScores, newScore];
            
            updatedScores.sort((a, b) => b.score - a.score);
            
            const topScores = updatedScores.slice(0, 100);
            
            setAllScores(topScores);
            
            const rank = topScores.findIndex(s => s.id === newScore.id) + 1;
            setCurrentPlayerRank(rank);
        }
    }, [gameResults, results.playerName, results.score, results.time, results.moves, results.mistakes, results.difficulty, allScores, setAllScores]);

    const getScoreGrade = (score) => {
        if (score >= 900) return 'Excellent!';
        if (score >= 700) return 'Great!';
        if (score >= 500) return 'Good!';
        return 'Try Again!';
    };


    const topPlayers = allScores.slice(0, 10).map((score, index) => ({
        id: score.id,
        rank: index + 1,
        name: score.name,
        score: score.score
    }));

    const currentPlayer = currentPlayerRank ? {
        id: Date.now(),
        rank: currentPlayerRank,
        name: results.playerName,
        score: results.score
    } : null;

    return (
        <div className="scores-page">
            <div className="scores-page__container">
                <h1 className="scores-page__title">Game Completed!</h1>

                <div className="scores-page__results">
                    <div className="scores-page__player">
                        <h2 className="scores-page__player-name">{results.playerName}</h2>
                        <div className="scores-page__grade">{getScoreGrade(results.score)}</div>
                        {currentPlayerRank && (
                            <div className="scores-page__rank">
                                Rank: #{currentPlayerRank}
                            </div>
                        )}
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
                                <span className="scores-page__stat-label">Mistakes</span>
                                <span className="scores-page__stat-value">
                                    {results.mistakes || 0}
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

                {topPlayers.length > 0 && (
                    <ScoresList
                        title="Top Scores"
                        players={topPlayers}
                        currentPlayer={currentPlayer}
                        showCurrentUserSeparately={currentPlayerRank && currentPlayerRank > 10}
                    />
                )}
            </div>
        </div>
    );
};

export default Scores;

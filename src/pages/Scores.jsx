import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ScoresList } from "../components/index.jsx";
import { formatTime } from "../utils/formatTime.js";
import { useLocalStorage } from "../hooks";
import { Scores as styles } from "../css";

const Scores = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  
  const [allScores, setAllScores] = useLocalStorage("sudoku-scores", []);
  const [currentPlayerRank, setCurrentPlayerRank] = useState(null);

  const gameResultsStr = localStorage.getItem(`sudoku-game-results-${playerId}`);
  const gameResults = gameResultsStr ? JSON.parse(gameResultsStr) : null;
  
  const results = gameResults || {
    playerName: "Player",
    score: 750,
    time: 245,
    moves: 67,
    mistakes: 0,
    difficulty: "Medium",
  };

  useEffect(() => {
    if (gameResults) {
      const scoreId = `score_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      
      const newScore = {
        id: scoreId,
        name: results.playerName,
        score: results.score,
        time: results.time,
        moves: results.moves,
        mistakes: results.mistakes,
        difficulty: results.difficulty,
        date: new Date().toISOString(),
      };

      const existingPlayerScoreIndex = allScores.findIndex(
        (s) => s.name === newScore.name
      );

      let updatedScores;

      if (existingPlayerScoreIndex !== -1) {
        const existingScore = allScores[existingPlayerScoreIndex];
        
        if (newScore.score > existingScore.score) {
          updatedScores = [...allScores];
          updatedScores[existingPlayerScoreIndex] = newScore;
          updatedScores.sort((a, b) => b.score - a.score);
          const topScores = updatedScores.slice(0, 100);
          setAllScores(topScores);
          const rank = topScores.findIndex((s) => s.name === newScore.name) + 1;
          setCurrentPlayerRank(rank);
        } else {
          const rank = allScores.findIndex((s) => s.name === newScore.name) + 1;
          setCurrentPlayerRank(rank);
        }
      } else {
        updatedScores = [...allScores, newScore];
        updatedScores.sort((a, b) => b.score - a.score);
        const topScores = updatedScores.slice(0, 100);
        setAllScores(topScores);
        const rank = topScores.findIndex((s) => s.name === newScore.name) + 1;
        setCurrentPlayerRank(rank);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameResults]);

  const handlePlayAgain = () => {
    navigate(`/game/${playerId}`);
  };

  const handleBackToStart = () => {
    localStorage.removeItem(`sudoku-game-results-${playerId}`);
    localStorage.removeItem(`sudoku-player-${playerId}`);
    localStorage.removeItem(`sudoku-saved-game-${playerId}`);
    navigate("/");
  };

  const getScoreGrade = (score) => {
    if (score >= 900) return "Excellent!";
    if (score >= 700) return "Great!";
    if (score >= 500) return "Good!";
    return "Try Again!";
  };

  const topPlayers = allScores.slice(0, 10).map((score, index) => ({
    id: score.id,
    rank: index + 1,
    name: score.name,
    score: score.score,
  }));

  const currentPlayer = currentPlayerRank
    ? {
        id: Date.now(),
        rank: currentPlayerRank,
        name: results.playerName,
        score: results.score,
      }
    : null;

  const primaryScoreClass = [styles.statValue, styles.statValuePrimary]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.scoresPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Game Completed!</h1>
        <div className={styles.results}>
          <div className={styles.player}>
            <h2 className={styles.playerName}>{results.playerName}</h2>
            <div className={styles.grade}>{getScoreGrade(results.score)}</div>
            {currentPlayerRank && (
              <div className={styles.rank}>Rank: #{currentPlayerRank}</div>
            )}
          </div>
          <div className={styles.stats}>
            <div className={styles.statGroup}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Final Score</span>
                <span className={primaryScoreClass}>{results.score}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Time</span>
                <span className={styles.statValue}>{formatTime(results.time)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Moves</span>
                <span className={styles.statValue}>{results.moves}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Mistakes</span>
                <span className={styles.statValue}>{results.mistakes || 0}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty</span>
                <span className={styles.statValue}>{results.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="primary" size="large" onClick={handlePlayAgain} className={styles.actionButton}>
            Play Again
          </Button>
          <Button variant="secondary" size="large" onClick={handleBackToStart} className={styles.actionButton}>
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

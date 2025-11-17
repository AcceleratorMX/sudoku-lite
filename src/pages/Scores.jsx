import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, ScoresList } from "../components/index";
import { formatTime, getScoreGrade, getGradeStatus } from "../utils";
import { useScoresStore, usePlayerStore, useGameStore } from "../stores";
import { ROUTES } from "../constants";
import { Scores as styles } from "../css";

/**
 * Scores Page Component
 *
 * Displays game results and leaderboard:
 * - Shows current game results
 * - Displays player ranking
 * - Shows top 10 leaderboard
 * - Provides navigation options
 *
 * Uses Zustand stores for state management
 */
const Scores = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();

  // Get data from Zustand stores
  const gameResults = usePlayerStore((state) => state.getGameResults(playerId));
  const addScore = useScoresStore((state) => state.addScore);
  const scores = useScoresStore((state) => state.scores); // Subscribe to scores array
  const clearAllPlayers = usePlayerStore((state) => state.clearAll);
  const clearAllGames = useGameStore((state) => state.clearAllGames);
  // Use default results if no game results found
  const results = gameResults || {
    playerName: "Player",
    score: 750,
    time: 245,
    moves: 67,
    mistakes: 0,
    difficulty: "Medium",
  };

  // Add score to leaderboard when component mounts
  useEffect(() => {
    if (gameResults) {
      const scoreWithDate = {
        name: gameResults.playerName,
        score: gameResults.score,
        time: gameResults.time,
        moves: gameResults.moves,
        mistakes: gameResults.mistakes,
        difficulty: gameResults.difficulty,
        date: gameResults.date || new Date().toISOString(),
      };
      addScore(scoreWithDate);
    }
  }, [gameResults, addScore]);

  /**
   * Navigate to game page to play again
   */
  const handlePlayAgain = () => {
    window.location.href = ROUTES.GAME(playerId);
  };

  /**
   * Clean up and return to start page
   * Clears ALL game and player data (cleanup old sessions too), keeping only scores
   */
  const handleBackToStart = () => {
    // Clear ALL player data and game data (not just current player)
    // This ensures clean state for next game
    clearAllGames();
    clearAllPlayers();
    
    // Force navigation after cleanup
    setTimeout(() => {
      navigate(ROUTES.START);
    }, 0);
  };

  // Get top 10 players for leaderboard
  const topScores = scores.slice(0, 10);
  
  // Add rank to each player
  const topPlayers = topScores.map((score, index) => ({
    ...score,
    rank: index + 1,
  }));

  // Get current player info if ranked
  const currentPlayerScore = scores.find(s => s.name === results.playerName);
  const currentPlayerRank = currentPlayerScore 
    ? scores.findIndex(s => s.name === results.playerName) + 1 
    : null;
  
  // Add rank to current player if exists
  const currentPlayerWithRank = currentPlayerScore
    ? {
        ...currentPlayerScore,
        rank: currentPlayerRank,
      }
    : null;

  const grade = getScoreGrade(results.score);
  const gradeStatus = getGradeStatus(grade);

  const primaryScoreClass = [styles.statValue, styles.statValuePrimary]
    .filter(Boolean)
    .join(" ");

  const gradeClass = [
    styles.grade,
    styles[`grade${gradeStatus.charAt(0).toUpperCase() + gradeStatus.slice(1)}`]
  ].filter(Boolean).join(" ");

  return (
    <div className={styles.scoresPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Game Completed!</h1>
        <div className={styles.results}>
          <div className={styles.player}>
            <h2 className={styles.playerName}>{results.playerName}</h2>
            <div className={gradeClass}>{grade}</div>
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
                <span className={styles.statValue}>
                  {formatTime(results.time)}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Moves</span>
                <span className={styles.statValue}>{results.moves}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Mistakes</span>
                <span className={styles.statValue}>
                  {results.mistakes || 0}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty</span>
                <span className={styles.statValue}>{results.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onClick={handlePlayAgain}
            className={styles.actionButton}
          >
            Play Again
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={handleBackToStart}
            className={styles.actionButton}
          >
            Exit
          </Button>
        </div>
        {topPlayers.length > 0 && (
          <ScoresList
            title="Top Scores"
            players={topPlayers}
            currentPlayer={currentPlayerWithRank}
            showCurrentUserSeparately={
              currentPlayerRank && currentPlayerRank > 10
            }
          />
        )}
      </div>
    </div>
  );
};

export default Scores;

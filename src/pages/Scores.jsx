import { useParams } from "react-router-dom";
import { Button, ScoresList } from "../components/index";
import { formatTime, getScoreGrade } from "../utils";
import { usePlayerSession, useScoreManager } from "../hooks";
import { gameStorageService } from "../services";
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
 * Now uses useScoreManager hook for all scoring logic
 * and service layer for storage operations.
 */
const Scores = () => {
  const { playerId } = useParams();
  const { navigateToStart } = usePlayerSession();

  // Load game results using service
  const gameResults = gameStorageService.getGameResults(playerId);

  // Use default results if no game results found
  const results = gameResults || {
    playerName: "Player",
    score: 750,
    time: 245,
    moves: 67,
    mistakes: 0,
    difficulty: "Medium",
  };

  // Manage scores and leaderboard
  const { currentPlayerRank, getTopPlayers, getCurrentPlayer } =
    useScoreManager(gameResults);

  /**
   * Navigate to game page to play again
   */
  const handlePlayAgain = () => {
    window.location.href = `/game/${playerId}`;
  };

  /**
   * Clean up and return to start page
   */
  const handleBackToStart = () => {
    gameStorageService.clearPlayerData(playerId);
    navigateToStart();
  };

  // Get top 10 players for leaderboard
  const topPlayers = getTopPlayers(10);

  // Get current player info if ranked
  const currentPlayer = getCurrentPlayer(results.playerName);

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
            currentPlayer={currentPlayer}
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

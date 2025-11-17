import { useNavigate } from "react-router-dom";
import { StartForm } from "../components/index";
import { useGameStore, usePlayerStore } from "../stores";
import { generatePlayerId } from "../utils";
import { ROUTES } from "../constants";
import { Start as styles } from "../css";

/**
 * Start Page Component
 * 
 * Entry point of the application where players:
 * - Enter their name
 * - Select game difficulty
 * - Start a new game
 * 
 * 
 * Uses Zustand stores for state management
 */
const Start = () => {
  const navigate = useNavigate();
  const gameSettings = useGameStore((state) => state.gameSettings);
  const setGameSettings = useGameStore((state) => state.setGameSettings);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const savePlayerData = usePlayerStore((state) => state.savePlayerData);

  /**
   * Handle form submission - start new game session
   * @param {string} name - Player name from form
   */
  const handleFormSubmit = (name) => {
    const playerId = generatePlayerId();
    
    // Save player data
    savePlayerData(playerId, {
      playerName: name,
      gameSettings,
    });
    
    // Start new game in game store
    startNewGame(playerId, name, gameSettings);
    
    // Navigate to game page
    navigate(ROUTES.GAME(playerId));
  };

  /**
   * Handle game settings changes
   * @param {Object} newSettings - Updated settings
   */
  const handleSettingsChange = (newSettings) => {
    setGameSettings(newSettings);
  };

  return (
    <div className={styles.startPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>SUDOKU LITE</h1>

        <StartForm
          onSubmit={handleFormSubmit}
          onSettingsChange={handleSettingsChange}
          initialSettings={gameSettings}
        />
      </div>
    </div>
  );
};

export default Start;

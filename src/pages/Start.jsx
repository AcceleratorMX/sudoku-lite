import { StartForm } from "../components/index.jsx";
import { useLocalStorage, usePlayerSession } from "../hooks";
import { GAME_SETTINGS_KEY, DIFFICULTY_LEVELS } from "../constants";
import { Start as styles } from "../css";

/**
 * Start Page Component
 * 
 * Entry point of the application where players:
 * - Enter their name
 * - Select game difficulty
 * - Start a new game
 * 
 * Uses usePlayerSession hook to manage session creation
 * and navigation logic.
 */
const Start = () => {
  const { startNewSession } = usePlayerSession();
  
  const [gameSettings, setGameSettings] = useLocalStorage(GAME_SETTINGS_KEY, {
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
  });

  /**
   * Handle form submission - start new game session
   * @param {string} name - Player name from form
   */
  const handleFormSubmit = (name) => {
    startNewSession(name, gameSettings);
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

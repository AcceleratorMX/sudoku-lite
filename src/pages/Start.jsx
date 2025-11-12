import { useNavigate } from "react-router-dom";
import { StartForm } from "../components/index.jsx";
import { useLocalStorage } from "../hooks";
import { GAME_SETTINGS_KEY, DIFFICULTY_LEVELS } from "../constants";
import { generatePlayerId } from "../utils/userUtils";
import { Start as styles } from "../css";

const Start = () => {
  const navigate = useNavigate();
  
  const [gameSettings, setGameSettings] = useLocalStorage(GAME_SETTINGS_KEY, {
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
  });

  const handleFormSubmit = (name) => {
    const playerId = generatePlayerId();
    
    localStorage.setItem(`sudoku-player-${playerId}`, JSON.stringify({
      playerName: name,
      gameSettings,
    }));
    
    navigate(`/game/${playerId}`);
  };

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

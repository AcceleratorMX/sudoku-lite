import { StartForm } from "../components/index.jsx";
import { useLocalStorage } from "../hooks";
import { GAME_SETTINGS_KEY, DIFFICULTY_LEVELS } from "../constants";

const Start = ({ onStartGame }) => {
  const [gameSettings, setGameSettings] = useLocalStorage(GAME_SETTINGS_KEY, {
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
  });

  const handleFormSubmit = (name) => {
    onStartGame(name, gameSettings);
  };

  const handleSettingsChange = (newSettings) => {
    setGameSettings(newSettings);
  };

  return (
    <>
      <div className="start-page">
        <div className="start-page__container">
          <h1 className="start-page__title">SUDOKU LITE</h1>

          <StartForm
            onSubmit={handleFormSubmit}
            onSettingsChange={handleSettingsChange}
            initialSettings={gameSettings}
          />
        </div>
      </div>
    </>
  );
};

export default Start;

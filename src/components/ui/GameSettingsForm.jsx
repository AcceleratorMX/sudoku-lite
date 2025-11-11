import { useForm } from "react-hook-form";
import {
  DIFFICULTY_LEVELS,
  DIFFICULTY_SETTINGS,
} from "../../constants/index.js";

const GameSettingsForm = ({
  onSettingsChange,
  initialSettings,
  className = "",
}) => {
  const { register } = useForm({
    mode: "onChange",
    defaultValues: {
      difficulty: initialSettings?.difficulty || DIFFICULTY_LEVELS.MEDIUM,
    },
  });

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    if (onSettingsChange) {
      onSettingsChange({ difficulty: newDifficulty });
    }
  };

  return (
    <div className={`game-settings-form ${className}`}>
      <label htmlFor="difficulty-select" className="game-settings-form__label"></label>
      <select
        id="difficulty-select"
        className="game-settings-form__select"
        {...register("difficulty", {
          onChange: handleDifficultyChange,
        })}
      >
        {Object.values(DIFFICULTY_LEVELS).map((level) => {
          const settings = DIFFICULTY_SETTINGS[level];
          return (
            <option key={level} value={level} title={settings.description}>
              {settings.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GameSettingsForm;

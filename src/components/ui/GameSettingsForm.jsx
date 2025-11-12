import { useForm } from "react-hook-form";
import {
  DIFFICULTY_LEVELS,
  DIFFICULTY_SETTINGS,
} from "../../constants/index.js";
import { GameSettingsForm as styles } from "../../css";

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

  const rootClassName = [styles.gameSettingsForm, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <label htmlFor="difficulty-select" className={styles.label}></label>
      <select
        id="difficulty-select"
        className={styles.select}
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

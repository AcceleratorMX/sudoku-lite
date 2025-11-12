import { useForm } from "react-hook-form";
import { useState } from "react";
import { NAME_VALIDATION, DIFFICULTY_LEVELS } from "../../constants/index.js";
import { Button, Difficulty } from "../index.jsx";
import { classNames } from "../../utils/classNames.js";
import { StartForm as styles } from "../../css";

/**
 * StartForm Component
 * 
 * Main form for starting a new game.
 * Collects player name and game difficulty settings.
 * 
 * Uses react-hook-form for name validation and state management.
 * Game settings are managed separately as they're stored independently.
 * 
 * @param {Function} onSubmit - Callback when form is submitted with player name
 * @param {Function} onSettingsChange - Callback when game settings change
 * @param {Object} initialSettings - Initial game settings (difficulty, etc.)
 * @param {string} className - Additional CSS classes
 */
const StartForm = ({
  onSubmit,
  onSettingsChange,
  initialSettings,
  className = "",
}) => {
  const [difficulty, setDifficulty] = useState(
    initialSettings?.difficulty || DIFFICULTY_LEVELS.MEDIUM
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      playerName: "",
    },
  });

  /**
   * Handle form submission
   * @param {Object} data - Form data from react-hook-form
   */
  const onSubmitForm = (data) => {
    onSubmit(data.playerName.trim());
  };

  /**
   * Handle difficulty change
   * @param {string} newDifficulty - Selected difficulty level
   */
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    if (onSettingsChange) {
      onSettingsChange({ difficulty: newDifficulty });
    }
  };

  const rootClassName = classNames(styles.startForm, className);

  const inputClassName = classNames(
    styles.input,
    errors.playerName && styles.inputError
  );

  return (
    <form className={rootClassName} onSubmit={handleSubmit(onSubmitForm)}>
      <div className={styles.fields}>
        <div className={styles.inputWrapper}>
          <label htmlFor="nickname" className={styles.label}></label>
          <input
            type="text"
            id="nickname"
            className={inputClassName}
            placeholder="Enter your name..."
            {...register("playerName", {
              required: "Name is required",
              minLength: {
                value: NAME_VALIDATION.MIN_NAME_LENGTH,
                message: `Minimum name length is ${NAME_VALIDATION.MIN_NAME_LENGTH} characters`,
              },
              maxLength: {
                value: NAME_VALIDATION.MAX_NAME_LENGTH,
                message: `Maximum name length is ${NAME_VALIDATION.MAX_NAME_LENGTH} characters`,
              },
              validate: {
                notEmpty: (value) =>
                  value.trim().length > 0 || "Name cannot be only spaces",
              },
            })}
          />
          {errors.playerName && (
            <span className={styles.error}>{errors.playerName.message}</span>
          )}
        </div>

        <Difficulty
          onChange={handleDifficultyChange}
          value={difficulty}
          className={styles.settings}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        className={styles.submit}
      >
        Start Game
      </Button>
    </form>
  );
};

export default StartForm;

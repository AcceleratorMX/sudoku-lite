import { useForm } from "react-hook-form";
import { NAME_VALIDATION } from "../../constants/index.js";
import { Button } from "../index.jsx";
import GameSettingsForm from "./GameSettingsForm.jsx";

const StartForm = ({
  onSubmit,
  onSettingsChange,
  initialSettings,
  className = "",
}) => {
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

  const onSubmitForm = (data) => {
    onSubmit(data.playerName.trim());
  };

  return (
    <form
      className={`start-form ${className}`}
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="start-form__fields">
        <div className="start-form__input-wrapper">
          <label htmlFor="nickname" className="start-form__label"></label>
          <input
            type="text"
            id="nickname"
            className={`start-form__input ${
              errors.playerName ? "start-form__input--error" : ""
            }`}
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
            <span className="start-form__error">
              {errors.playerName.message}
            </span>
          )}
        </div>

        <GameSettingsForm
          onSettingsChange={onSettingsChange}
          initialSettings={initialSettings}
          className="start-form__settings"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        className="start-form__submit"
      >
        Start Game
      </Button>
    </form>
  );
};

export default StartForm;

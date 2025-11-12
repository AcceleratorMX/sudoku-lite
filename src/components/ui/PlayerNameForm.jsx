import { useForm } from "react-hook-form";
import { NAME_VALIDATION } from "../../constants/index.js";
import { Button } from "../index.jsx";
import { PlayerNameForm as styles } from "../../css";

const PlayerNameForm = ({ onSubmit, className = "" }) => {
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

  const rootClassName = [styles.playerNameForm, className]
    .filter(Boolean)
    .join(" ");

  const inputClassName = [
    styles.input,
    errors.playerName ? styles.inputError : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <form
      className={rootClassName}
      onSubmit={handleSubmit(onSubmitForm)}
    >
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

export default PlayerNameForm;

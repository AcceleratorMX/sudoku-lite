import {useState} from "react";
import {NAME_VALIDATION} from "../constants/index.js";

const Start = ({onStartGame}) => {
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedName = playerName.trim();

        if (trimmedName.length < NAME_VALIDATION.MIN_NAME_LENGTH) {
            setError(`Minimum name length must be ${NAME_VALIDATION.MIN_NAME_LENGTH} characters!`);
            return;
        }

        if (trimmedName.length > NAME_VALIDATION.MAX_NAME_LENGTH) {
            setError(`Maximum name length must be ${NAME_VALIDATION.MAX_NAME_LENGTH} characters!`);
            return;
        }

        setError('');
        onStartGame(trimmedName);
    };

    const handlePlayerNameChange = (e) => {
        setPlayerName(e.target.value);
        if (error) {
            setError('');
        }
    };

    return (
        <>
            <div className="start-page">
                <div className="start-page__container">
                    <h1 className="start-page__title">SUDOKU 9×9</h1>

                    <form className="start-page__form" onSubmit={handleSubmit}>
                        <label htmlFor="nickname"></label>
                        <input
                            type="text"
                            id="nickname"
                            className={`start-page__input ${error ? 'start-page__input--error' : ''}`}
                            placeholder="Enter your name..."
                            minLength={NAME_VALIDATION.MIN_NAME_LENGTH}
                            maxLength={NAME_VALIDATION.MAX_NAME_LENGTH}
                            value={playerName}
                            onChange={handlePlayerNameChange}
                        />
                        {error && <span className="start-page__error">{error}</span>}
                        <button
                            type="submit"
                            className="start-page__button"
                        >
                            Start Game
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Start
import React, { useState } from 'react';
import { NAME_VALIDATION } from '../../constants/index.js';
import { Button } from '../index.jsx';

const PlayerNameForm = ({ onSubmit, className = '' }) => {
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
        onSubmit(trimmedName);
    };

    const handlePlayerNameChange = (e) => {
        setPlayerName(e.target.value);
        if (error) {
            setError('');
        }
    };

    return (
        <form className={`player-name-form ${className}`} onSubmit={handleSubmit}>
            <label htmlFor="nickname" className="player-name-form__label">
                Enter your name
            </label>
            <input
                type="text"
                id="nickname"
                className={`player-name-form__input ${error ? 'player-name-form__input--error' : ''}`}
                placeholder="Enter your name..."
                minLength={NAME_VALIDATION.MIN_NAME_LENGTH}
                maxLength={NAME_VALIDATION.MAX_NAME_LENGTH}
                value={playerName}
                onChange={handlePlayerNameChange}
                required
            />
            {error && <span className="player-name-form__error">{error}</span>}
            <Button
                type="submit"
                variant="primary"
                size="large"
                className="player-name-form__submit"
            >
                Start Game
            </Button>
        </form>
    );
};

export default PlayerNameForm;
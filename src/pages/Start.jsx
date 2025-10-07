import { PlayerNameForm } from "../components/index.jsx";

const Start = ({ onStartGame }) => {
    const handleFormSubmit = (playerName) => {
        onStartGame(playerName);
    };

    return (
        <>
            <div className="start-page">
                <div className="start-page__container">
                    <h1 className="start-page__title">SUDOKU 9×9</h1>
                    <PlayerNameForm 
                        onSubmit={handleFormSubmit}
                        className="start-page__form"
                    />
                </div>
            </div>
        </>
    );
};

export default Start;
import {Player} from '../index.jsx';

const ScoresList = ({ title, players, currentPlayer = null, showCurrentUserSeparately = false }) => {
    return (
        <div className="scores-page__leaderboard">
            <h3 className="scores-page__leaderboard-title">{title}</h3>
            <div className="scores-page__leaderboard-list">
                {players.map(player => (
                    <Player
                        key={player.id}
                        id={player.id}
                        rank={player.rank}
                        name={player.name}
                        score={player.score}
                        isCurrentUser={false}
                    />
                ))}
            </div>
            
            {showCurrentUserSeparately && currentPlayer && (
                <div className="scores-page__current-user">
                    <Player
                        key={currentPlayer.id}
                        id={currentPlayer.id}
                        rank={currentPlayer.rank}
                        name={currentPlayer.name}
                        score={currentPlayer.score}
                        isCurrentUser={true}
                    />
                </div>
            )}
        </div>
    );
};

export default ScoresList;
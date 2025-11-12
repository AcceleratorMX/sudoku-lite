import { Player } from "../index.jsx";
import { ScoresList as styles } from "../../css";

const ScoresList = ({
    title,
    players,
    currentPlayer = null,
    showCurrentUserSeparately = false,
}) => {
    return (
        <div className={styles.leaderboard}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.list}>
                {players.map((player) => (
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
                <div className={styles.currentUser}>
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
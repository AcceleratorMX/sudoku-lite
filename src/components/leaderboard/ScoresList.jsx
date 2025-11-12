import { Player } from "../index";
import { ScoresList as styles } from "../../css";

/**
 * ScoresList Component
 * 
 * Displays a list of players with their rankings and scores.
 * Can optionally show the current player separately below the list.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title for the leaderboard section
 * @param {Array<Object>} props.players - Array of player objects to display
 * @param {Object|null} [props.currentPlayer=null] - Current player object
 * @param {boolean} [props.showCurrentUserSeparately=false] - Whether to show current user separately
 * @returns {JSX.Element} ScoresList component
 */
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
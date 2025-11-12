import { Player as styles } from "../../css";

const Player = ({ rank, name, score, isCurrentUser = false }) => {
    const playerClassName = [
        styles.item,
        isCurrentUser ? styles.current : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={playerClassName}>
            <span className={styles.rank}>{rank}.</span>
            <span className={styles.name}>{name}</span>
            <span className={styles.score}>{score}</span>
        </div>
    );
};

export default Player;
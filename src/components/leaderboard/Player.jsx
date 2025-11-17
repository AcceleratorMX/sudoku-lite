import { memo } from "react";
import { classNames, getScoreGrade, getGradeStatus } from "../../utils";
import { Player as styles } from "../../css";

/**
 * Player Component
 * 
 * Displays a single player entry in the leaderboard with rank, name, and score.
 * Can highlight the current user with a special style.
 * Shows grade with appropriate color based on score.
 * 
 * @param {Object} props - Component props
 * @param {number} props.rank - Player's rank in the leaderboard
 * @param {string} props.name - Player's name
 * @param {number} props.score - Player's score
 * @param {boolean} [props.isCurrentUser=false] - Whether this is the current user
 * @returns {JSX.Element} Player component
 */
const Player = memo(({ rank, name, score, isCurrentUser = false }) => {
    const grade = getScoreGrade(score);
    const gradeStatus = getGradeStatus(grade);
    
    const scoreClass = classNames(
        styles.score,
        styles[`score${gradeStatus.charAt(0).toUpperCase() + gradeStatus.slice(1)}`]
    );

    return (
        <div className={classNames(styles.item, isCurrentUser && styles.current)}>
            <span className={styles.rank}>{rank}.</span>
            <span className={styles.name}>{name}</span>
            <span className={scoreClass}>{score}</span>
        </div>
    );
});

export default Player;
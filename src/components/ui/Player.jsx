const Player = ({ id, rank, name, score, isCurrentUser = false }) => {
    const className = `scores-page__leaderboard-item ${isCurrentUser ? 'scores-page__leaderboard-item--current' : ''}`;
    
    return (
        <div className={className}>
            <span className="scores-page__leaderboard-rank">{rank}.</span>
            <span className="scores-page__leaderboard-name">{name}</span>
            <span className="scores-page__leaderboard-score">{score}</span>
        </div>
    );
};

export default Player;
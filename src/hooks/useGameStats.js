import { useState, useCallback } from 'react';

const useGameStats = () => {
    const [stats, setStats] = useState({
        moves: 0,
        mistakes: 0,
        score: 0,
        isCompleted: false,
        isPaused: false
    });

    const incrementMoves = useCallback(() => {
        setStats(prev => ({
            ...prev,
            moves: prev.moves + 1
        }));
    }, []);

    const incrementMistakes = useCallback(() => {
        setStats(prev => ({
            ...prev,
            mistakes: prev.mistakes + 1
        }));
    }, []);

    const updateScore = useCallback((newScore) => {
        setStats(prev => ({
            ...prev,
            score: newScore
        }));
    }, []);

    const calculateFinalScore = useCallback((time, moves, mistakes) => {
        let score = 1000;
        
        const timeOver180 = Math.max(0, time - 180);
        score -= timeOver180;
        
        const movesOver81 = Math.max(0, moves - 81);
        score -= movesOver81 * 2;
        
        score -= mistakes * 50;
        
        return Math.max(0, score);
    }, []);

    const completeGame = useCallback(() => {
        setStats(prev => ({
            ...prev,
            isCompleted: true
        }));
    }, []);

    const togglePause = useCallback(() => {
        setStats(prev => ({
            ...prev,
            isPaused: !prev.isPaused
        }));
    }, []);

    const resetStats = useCallback(() => {
        setStats({
            moves: 0,
            mistakes: 0,
            score: 0,
            isCompleted: false,
            isPaused: false
        });
    }, []);

    return {
        stats,
        incrementMoves,
        incrementMistakes,
        updateScore,
        calculateFinalScore,
        completeGame,
        togglePause,
        resetStats
    };
};

export default useGameStats;

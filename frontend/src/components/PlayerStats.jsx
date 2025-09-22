import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerStats = ({ matchId }) => {
    const [playerStats, setPlayerStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/playerStats?matchId=${matchId}`);
                const matchStats = response.data.filter(stat => stat.matchId === matchId);
                setPlayerStats(matchStats);
            } catch (err) {
                console.error(err);
                setError('Failed to load player stats');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerStats();
    }, [matchId]);

    if (loading) return <p>Loading player stats...</p>;
    if (error) return <p>{error}</p>;

    if (playerStats.length === 0) return <p>No stats recorded for this match.</p>;


    return (
        <div>
            <h2>Player Stats</h2>
            <ul>
                {playerStats.map((player) => (
                    <li key={player.id}>
                        {player.riotId} - {player.kills}/{player.deaths}/{player.assists}
                        (ACS: {player.acs})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerStats;

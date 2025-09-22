import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Players = ({ teamId }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/players');
                const teamPlayers = response.data.filter(player => player.teamId === teamId);
                setPlayers(teamPlayers);
            } catch (err) {
                console.error(err);
                setError('Failed to load players');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [teamId]);

    if (loading) return <p>Loading players...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Players</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.riotId} ({player.discordId})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Players;
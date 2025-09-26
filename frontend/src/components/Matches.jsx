import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerStats from './PlayerStats';

const Matches = ({ seasonId }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/matches?seasonId=${seasonId}`);
                const seasonMatches = response.data.filter(match => match.seasonId === seasonId);
                setMatches(seasonMatches);
            } catch (err) {
                console.error(err);
                setError('Failed to load matches');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [seasonId]);

    if (loading) return <p>Loading matches...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Matches</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>
                        {match.redTeam?.name} vs {match.blueTeam?.name}
                        on <strong>{match.map}</strong> ({new Date(match.matchDate).toLocaleDateString()})
                        <PlayerStats matchId={match.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Matches;

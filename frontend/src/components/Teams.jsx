import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Players from './Players';

const Teams = ({ seasonId }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:4000/teams');
                const seasonTeams = response.data.filter(team => team.seasonId === seasonId);
                setTeams(seasonTeams);
            } catch (err) {
                console.error(err);
                setError('Failed to load teams');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [seasonId]);

    if (loading) return <p>Loading teams...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Teams</h2>
            <ul>
                {teams.map((team) => (
                    <li key={team.id}>
                        <strong>{team.name}</strong>
                        {<Players teamId={team.id} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Teams;

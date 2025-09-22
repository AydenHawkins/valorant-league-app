import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Seasons = () => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const response = await axios.get('http://localhost:4000/seasons');
                setSeasons(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load seasons');
            } finally {
                setLoading(false);
            }
        };

        fetchSeasons();
    }, []);

    if (loading) return <p>Loading seasons...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Seasons</h2>
            <ul>
                {seasons.map((season) => (
                    <li key={season.id}>
                        {season.name} ({new Date(season.startDate).toLocaleDateString()} - {season.endDate ? new Date(season.endDate).toLocaleDateString() : 'Ongoing'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Seasons;  
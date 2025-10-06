// src/components/MatchImporter.jsx
import { useState } from 'react';
import axios from 'axios';

export default function MatchImporter() {
    const [matchId, setMatchId] = useState('');
    const [region, setRegion] = useState('na');
    const [seasonId, setSeasonId] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Uploading match...');

        try {
            const payload = { matchId, region };
            if (seasonId) payload.seasonId = Number(seasonId);

            const res = await axios.post('http://localhost:4000/import', payload);
            setStatus(`Match imported! Match ID in DB: ${res.data.matchId}`);
            setMatchId('');
        } catch (err) {
            console.error('Full Axios error:', err);
            if (err.response) {
                // Server responded with a status code outside 2xx
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
            } else if (err.request) {
                // Request was made but no response received
                console.error('No response received:', err.request);
            } else {
                console.error('Error setting up request:', err.message);
            }
            setStatus('Error importing match. Check console for details.');
        }

    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>Import Valorant Match</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Region:</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option value="na">NA</option>
                        <option value="eu">EU</option>
                        <option value="kr">KR</option>
                        <option value="ap">AP</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Match ID:</label>
                    <input
                        type="text"
                        value={matchId}
                        onChange={(e) => setMatchId(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Season ID (optional):</label>
                    <input
                        type="number"
                        value={seasonId}
                        onChange={(e) => setSeasonId(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>

                <button type="submit">Import Match</button>
            </form>

            {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
        </div>
    );
}

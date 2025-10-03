import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Stats() {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('http://localhost:4000/playerStats')
                setPlayers(res.data || [])
            } catch (err) {
                console.error(err)
                setError('Failed to load player stats')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p>Loading player stats...</p>
    if (error) return <p>{error}</p>

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Player Stats</h2>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>Assists</th>
                        <th>K/D</th>
                        <th>ACS</th>
                        <th>ADR</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((p) => (
                        <tr key={p.id}>
                            <td>{p.player?.name}#{p.player?.tag}</td>
                            <td>{p.player?.team?.name || '—'}</td>
                            <td>{p.kills}</td>
                            <td>{p.deaths}</td>
                            <td>{p.assists}</td>
                            <td>{p.kdRatio}</td>
                            <td>{p.acs}</td>
                            <td>{p.adr}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

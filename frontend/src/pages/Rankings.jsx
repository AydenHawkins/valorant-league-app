import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Rankings() {
    const [rankings, setRankings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('http://localhost:4000/rankings')
                setRankings(res.data || [])
            } catch (err) {
                console.error(err)
                setError('Failed to load rankings')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p>Loading rankings...</p>
    if (error) return <p>{error}</p>

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Team Rankings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((t, idx) => (
                        <tr key={t.id}>
                            <td>{idx + 1}</td>
                            <td>{t.name}</td>
                            <td>{t.wins}</td>
                            <td>{t.losses}</td>
                            <td>{t.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

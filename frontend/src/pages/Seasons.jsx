import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Seasons() {
    const [seasons, setSeasons] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get('http://localhost:4000/seasons')
                setSeasons(res.data || [])
            } catch (err) {
                console.error(err)
                setError('Failed to load seasons')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p>Loading seasons...</p>
    if (error) return <p>{error}</p>

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Seasons</h2>
            <ul>
                {seasons.map((season) => (
                    <li key={season.id}>
                        {season.name} ({new Date(season.startDate).toLocaleDateString()} - {season.endDate ? new Date(season.endDate).toLocaleDateString() : 'Ongoing'})
                    </li>
                ))}
            </ul>
        </div>
    )
}

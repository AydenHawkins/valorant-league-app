import { useEffect, useState } from 'react'
import axios from 'axios'

// Component to display a single series card
function SeriesCard({ series }) {
    const { redTeamName, blueTeamName, matches } = series
    // compute series score: count wins per side
    let redWins = 0
    let blueWins = 0
    matches.forEach(m => {
        // determine winner: prefer explicit m.winner, else use scores if present
        if (m.winner) {
            if (m.winner === m.redTeamName) redWins++
            else if (m.winner === m.blueTeamName) blueWins++
        } else if (typeof m.redScore === 'number' && typeof m.blueScore === 'number') {
            if (m.redScore > m.blueScore) redWins++
            else if (m.blueScore > m.redScore) blueWins++
        }
    })

    const scoreString = `${redWins}:${blueWins}`

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{redTeamName} {"{"}{scoreString}{"}"} {blueTeamName}</h3>
            <ul>
                {matches.map(match => (
                    <li key={match.id}>
                        {match.map} - {new Date(match.matchDate).toLocaleDateString()} - Winner: {match.winner || (typeof match.redScore === 'number' && typeof match.blueScore === 'number' ? (match.redScore > match.blueScore ? match.redTeamName : (match.blueScore > match.redScore ? match.blueTeamName : 'Draw')) : 'TBD')}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function MatchesPage() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchMatches() {
            try {
                const res = await axios.get('http://localhost:4000/matches')
                setMatches(res.data)
            } catch (err) {
                console.error(err)
                setError('Failed to load matches')
            } finally {
                setLoading(false)
            }
        }

        fetchMatches()
    }, [])

    if (loading) return <p>Loading matches...</p>
    if (error) return <p>{error}</p>

    // Group matches into "series" by season + team combination
    const seriesMap = {}
    matches.forEach(match => {
        const teamIds = [match.redTeamId, match.blueTeamId].sort().join('-')
        const key = `${match.seasonId}-${teamIds}`
        if (!seriesMap[key]) {
            seriesMap[key] = {
                seasonId: match.seasonId,
                redTeamName: match.redTeamName,
                blueTeamName: match.blueTeamName,
                matches: []
            }
        }
        seriesMap[key].matches.push(match)
    })

    const seriesArray = Object.values(seriesMap)

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Matches & Series</h2>
            {seriesArray.length === 0 ? (
                <p>No matches found.</p>
            ) : (
                seriesArray.map((s, idx) => <SeriesCard key={idx} series={s} />)
            )}
        </div>
    )
}

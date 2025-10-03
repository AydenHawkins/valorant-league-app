// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()
    const activeStyle = { fontWeight: 'bold', textDecoration: 'underline' }

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem' }}>
            <Link to="/" style={location.pathname === '/' ? activeStyle : { marginRight: '1rem' }}>Home</Link>
            <Link to="/seasons" style={location.pathname === '/seasons' ? activeStyle : { marginRight: '1rem' }}>Seasons</Link>
            <Link to="/matches" style={location.pathname === '/matches' ? activeStyle : { marginRight: '1rem' }}>Matches</Link>
            <Link to="/stats" style={location.pathname === '/stats' ? activeStyle : { marginRight: '1rem' }}>Stats</Link>
            <Link to="/rankings" style={location.pathname === '/rankings' ? activeStyle : {}}>Rankings</Link>
        </nav>
    )
}

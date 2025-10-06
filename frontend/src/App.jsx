// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Seasons from './pages/Seasons'
import Matches from './pages/Matches'
import Stats from './pages/Stats'
import Rankings from './pages/Rankings'

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

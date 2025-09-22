import React from 'react';
import Seasons from './components/Seasons';
import Teams from './components/Teams';
import Players from './components/Players';
import Matches from './components/Matches';

function App() {
  return (
    <div className="App">
      <h1>Valorant League Stats</h1>
      <Seasons />
      <Teams seasonId={1} />
      <Matches seasonId={1} />
    </div>
  );
}

export default App;


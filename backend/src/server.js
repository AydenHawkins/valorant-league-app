require('dotenv').config();
const express = require('express');
const cors = require('cors');
const seasonsRouter = require('./routes/season');
const teamsRouter = require('./routes/team');
const playerRouter = require('./routes/player');
const seriesRouter = require('./routes/series');
const mapGameRouter = require('./routes/mapGame');
const roundRouter = require('./routes/round');
const teamRosterRouter = require('./routes/teamRoster');
const playerStatsRouter = require('./routes/playerStats');
const teamStatsRouter = require('./routes/teamStats');
const substitutionsRouter = require('./routes/substitution');
const roundPlayerStatsRouter = require('./routes/roundPlayerStats');
const plantsRouter = require('./routes/plant');
const defusesRouter = require('./routes/defuse');
const valorantRouter = require('./routes/valorant');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use('/seasons', seasonsRouter);
app.use('/teams', teamsRouter);
app.use('/players', playerRouter);
app.use('/series', seriesRouter);
app.use('/mapGames', mapGameRouter);
app.use('/rounds', roundRouter);
app.use('/teamRosters', teamRosterRouter);
app.use('/playerStats', playerStatsRouter);
app.use('/teamStats', teamStatsRouter);
app.use('/substitutions', substitutionsRouter);
app.use('/roundPlayerStats', roundPlayerStatsRouter);
app.use('/plants', plantsRouter);
app.use('/defuses', defusesRouter);
app.use('/valorant', valorantRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
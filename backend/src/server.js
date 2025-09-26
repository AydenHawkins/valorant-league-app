require('dotenv').config();
const express = require('express');
const cors = require('cors');
const seasonsRouter = require('./routes/season');
const teamsRouter = require('./routes/team');
const playerRouter = require('./routes/player');
const matchRouter = require('./routes/match');
const playerStatsRouter = require('./routes/playerStats');
const valorantRouter = require('./routes/valorant');
const matchImportRouter = require('./routes/matchImport');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use('/seasons', seasonsRouter);
app.use('/teams', teamsRouter);
app.use('/players', playerRouter);
app.use('/matches', matchRouter);
app.use('/playerstats', playerStatsRouter);
app.use('/valorant', valorantRouter);
app.use('/import', matchImportRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
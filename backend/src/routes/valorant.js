const express = require('express');
const { getMatchById, getMatchesByPlayer } = require('../services/valorantApi');

const router = express.Router();

router.get('/match/:region/:matchId', async (req, res) => {
    const { region, matchId } = req.params;
    try {
        const matchData = await getMatchById(region, matchId);
        res.json(matchData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch match data' });
    }
});

router.get('/matches/:region/:platform/:name/:tag', async (req, res) => {
    const { region, platform, name, tag } = req.params;
    try {
        const matchesData = await getMatchesByPlayer(region, platform, name, tag);
        res.json(matchesData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches data' });
    }
});

module.exports = router;
const playersService = require("./players.service");

// GET /players - Retrieve all players
const getPlayers = async (req, res) => {
    try {
        const players = await playersService.getAllPlayers();
        res.json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /players/:id - Retrieve a player by ID
const getPlayerById = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await playersService.getPlayerById(id);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ error: "Player not found" });
        }
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /players - Create a new player
const createPlayer = async (req, res) => {
    try {
        const newPlayer = await playersService.createPlayer(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /players/:id - Update an existing player
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlayer = await playersService.updatePlayer(id, req.body);
        res.json(updatedPlayer);
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /players/:id - Delete a player
const deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        await playersService.deletePlayer(id);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
};

const prisma = require("..utils/prisma");

// GET /kills - Retrieve all kills
const getKills = async (req, res) => {
    try {
        const kills = await prisma.kill.findMany();
        res.status(200).json(kills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve kills" });
    }
};

// GET /kills/:id - Retrieve a kill by ID
const getKillById = async (req, res) => {
    const { id } = req.params;
    try {
        const kill = await prisma.kill.findUnique({
            where: { id: parseInt(id) },
        });
        if (kill) {
            res.status(200).json(kill);
        } else {
            res.status(404).json({ error: "Kill not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve kill" });
    }
};

// POST /kills - Create a new kill
const createKill = async (req, res) => {
    const {
        matchId,
        roundNumber,
        timeInRoundMs,
        timeInMatchMs,
        killerId,
        victimId,
        locationX,
        locationY,
        weaponId,
        weaponName,
        weaponType,
        secondaryFireMode,
    } = req.body;
    try {
        const newKill = await prisma.kill.create({
            data: {
                matchId,
                roundNumber,
                timeInRoundMs,
                timeInMatchMs,
                killerId,
                victimId,
                locationX: locationX ? locationX : null,
                locationY: locationY ? locationY : null,
                weaponId: weaponId ? weaponId : null,
                weaponName: weaponName ? weaponName : null,
                weaponType: weaponType ? weaponType : null,
                secondaryFireMode: secondaryFireMode
                    ? secondaryFireMode
                    : false,
            },
        });
        res.status(201).json(newKill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create kill" });
    }
};

// PUT /kills/:id - Update a kill by ID
const updateKill = async (req, res) => {
    const { id } = req.params;
    const {
        matchId,
        roundNumber,
        timeInRoundMs,
        timeInMatchMs,
        killerId,
        vicitimId,
        locationX,
        locationY,
        weaponId,
        weaponName,
        weaponType,
        secondaryFireMode,
    } = req.body;
    try {
        const updatedKill = await prisma.kill.update({
            where: { id: parseInt(id) },
            data: {
                matchId,
                roundNumber,
                timeInRoundMs,
                timeInMatchMs,
                killerId,
                vicitimId,
                locationX,
                locationY,
                weaponId,
                weaponName,
                weaponType,
                secondaryFireMode,
            },
        });
        res.status(200).json(updatedKill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update kill" });
    }
};

// DELETE /kills/:id - Delete a kill by ID
const deleteKill = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.kill.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete kill" });
    }
};
module.exports = {
    getKills,
    getKillById,
    createKill,
    updateKill,
    deleteKill,
};

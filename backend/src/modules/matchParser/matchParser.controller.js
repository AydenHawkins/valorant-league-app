const { parseMatchData, importMatchToDatabase } = require("./matchParser.service");
const { getMatchById } = require("../../integrations/valorantApi.integrations");

/**
 * POST /matchParser/preview
 * Preview parsed match data before importing
 */
const previewMatchData = async (req, res) => {
    try {
        const { region, matchId, seriesId, matchNumber } = req.body;

        // Validate required fields
        if (!region || !matchId) {
            return res.status(400).json({
                error: "Missing required fields: region and matchId are required",
            });
        }

        // Fetch match data from Valorant API
        const matchData = await getMatchById(region, matchId);

        // Parse the match data
        const parsedData = parseMatchData(matchData, {
            seriesId: seriesId || null,
            matchNumber: matchNumber || 1,
        });

        res.json({
            success: true,
            message: "Match data parsed successfully",
            data: parsedData,
        });
    } catch (error) {
        console.error("Error previewing match data:", error);
        res.status(500).json({
            error: "Failed to preview match data",
            details: error.message,
        });
    }
};

/**
 * POST /matchParser/import
 * Import match data into database
 */
const importMatchData = async (req, res) => {
    try {
        const {
            region,
            matchId,
            seriesId,
            matchNumber,
            teamMappings, // { Red: dbTeamId, Blue: dbTeamId }
        } = req.body;

        // Validate required fields
        if (!region || !matchId || !seriesId || !teamMappings) {
            return res.status(400).json({
                error: "Missing required fields: region, matchId, seriesId, and teamMappings are required",
            });
        }

        // Validate teamMappings has both Red and Blue
        if (!teamMappings.Red || !teamMappings.Blue) {
            return res.status(400).json({
                error: "teamMappings must include both 'Red' and 'Blue' team IDs",
            });
        }

        // Fetch match data from Valorant API
        const matchData = await getMatchById(region, matchId);

        // Import match data to database
        const result = await importMatchToDatabase(matchData, {
            seriesId,
            matchNumber: matchNumber || 1,
            teamMappings,
        });

        res.json({
            success: true,
            message: "Match data imported successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error importing match data:", error);

        // Check if it's a duplicate match error
        if (error.message.includes("already exists")) {
            return res.status(409).json({
                error: "Match already imported",
                details: error.message,
            });
        }

        res.status(500).json({
            error: "Failed to import match data",
            details: error.message,
        });
    }
};

/**
 * POST /matchParser/validate
 * Validate match data format
 */
const validateMatchData = async (req, res) => {
    try {
        const { region, matchId } = req.body;

        if (!region || !matchId) {
            return res.status(400).json({
                error: "Missing required fields: region and matchId are required",
            });
        }

        // Fetch and validate match data exists
        const matchData = await getMatchById(region, matchId);

        // Basic validation
        const validation = {
            hasMetadata: !!matchData.data?.metadata,
            hasPlayers: !!matchData.data?.players && matchData.data.players.length > 0,
            hasRounds: !!matchData.data?.rounds && matchData.data.rounds.length > 0,
            hasTeams: !!matchData.data?.teams && matchData.data.teams.length === 2,
            playerCount: matchData.data?.players?.length || 0,
            roundCount: matchData.data?.rounds?.length || 0,
            isCompleted: matchData.data?.metadata?.is_completed || false,
        };

        const isValid = validation.hasMetadata &&
            validation.hasPlayers &&
            validation.hasRounds &&
            validation.hasTeams &&
            validation.playerCount === 10;

        res.json({
            valid: isValid,
            validation,
            matchId: matchData.data?.metadata?.match_id,
        });
    } catch (error) {
        console.error("Error validating match data:", error);
        res.status(500).json({
            error: "Failed to validate match data",
            details: error.message,
        });
    }
};

module.exports = {
    previewMatchData,
    importMatchData,
    validateMatchData,
};

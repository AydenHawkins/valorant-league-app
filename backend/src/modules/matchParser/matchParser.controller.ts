import { Request, Response } from "express";
import * as matchParserService from "./matchParser.service";
import * as valorantApi from "../../integrations/valorantApi.integrations";

/**
 * POST /matchParser/preview
 * Preview parsed match data before importing
 */
export const previewMatchData = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { region, matchId, seriesId, matchNumber } = req.body;

        if (!region || !matchId) {
            res.status(400).json({
                error: "Missing required fields: region and matchId are required",
            });
            return;
        }

        const matchData = await valorantApi.getMatchById(region, matchId);

        const parsedData = matchParserService.parseMatchData(matchData, {
            seriesId: seriesId || null,
            matchNumber: matchNumber || 1,
        });

        res.json({
            success: true,
            message: "Match data parsed successfully",
            data: parsedData,
        });
    } catch (error: any) {
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
export const importMatchData = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { region, matchId, seriesId, matchNumber, teamMappings } = req.body;

        if (!region || !matchId || !seriesId || !teamMappings) {
            res.status(400).json({
                error: "Missing required fields: region, matchId, seriesId, and teamMappings are required",
            });
            return;
        }

        if (!teamMappings.Red || !teamMappings.Blue) {
            res.status(400).json({
                error: "teamMappings must include both 'Red' and 'Blue' team IDs",
            });
            return;
        }

        const matchData = await valorantApi.getMatchById(region, matchId);

        const result = await matchParserService.importMatchToDatabase(
            matchData,
            {
                seriesId,
                matchNumber: matchNumber || 1,
                teamMappings,
            }
        );

        res.json({
            success: true,
            message: "Match data imported successfully",
            data: result,
        });
    } catch (error: any) {
        console.error("Error importing match data:", error);

        if (error.message.includes("already exists")) {
            res.status(409).json({
                error: "Match already imported",
                details: error.message,
            });
            return;
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
export const validateMatchData = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { region, matchId } = req.body;

        if (!region || !matchId) {
            res.status(400).json({
                error: "Missing required fields: region and matchId are required",
            });
            return;
        }

        const matchData = await valorantApi.getMatchById(region, matchId);

        const validation = {
            hasMetadata: !!matchData.data?.metadata,
            hasPlayers:
                !!matchData.data?.players && matchData.data.players.length > 0,
            hasRounds:
                !!matchData.data?.rounds && matchData.data.rounds.length > 0,
            hasTeams:
                !!matchData.data?.teams && matchData.data.teams.length === 2,
            playerCount: matchData.data?.players?.length || 0,
            roundCount: matchData.data?.rounds?.length || 0,
            isCompleted: matchData.data?.metadata?.is_completed || false,
        };

        const isValid =
            validation.hasMetadata &&
            validation.hasPlayers &&
            validation.hasRounds &&
            validation.hasTeams &&
            validation.playerCount === 10;

        res.json({
            valid: isValid,
            validation,
            matchId: matchData.data?.metadata?.match_id,
        });
    } catch (error: any) {
        console.error("Error validating match data:", error);
        res.status(500).json({
            error: "Failed to validate match data",
            details: error.message,
        });
    }
};

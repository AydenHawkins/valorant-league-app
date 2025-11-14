const {
    calculateHeadshotPercentage,
    calculateKDRatio,
    calculateKDA,
    calculateACS,
    calculateADR,
    calculateFirstBloods,
    calculateFirstDeaths,
    mapTeamIdToSide,
    organizeKillsByRound,
    calculatePlantsAndDefuses,
} = require("./matchParser.utils");

const {
    upsertPlayer,
    createMatch,
    createMatchParticipation,
    createMatchPlayerStats,
    createRound,
    createRoundPlayerStats,
    createRoundTeamStats,
    createKill,
    createPlant,
    createDefuse,
    createMatchTeamStats,
    findMatchByRiotId,
} = require("./matchParser.repository");

/**
 * Parse match metadata from API response
 * @param {Object} matchData - Raw match data from Valorant API
 * @param {Object} contextData - User-provided context {seriesId, matchNumber}
 * @returns {Object} Parsed match metadata
 */
const parseMatchMetadata = (matchData, contextData) => {
    const metadata = matchData.data.metadata;
    const teams = matchData.data.teams;

    // Determine winner
    const winnerTeam = teams.find(t => t.won === true);
    const winnerTeamSide = winnerTeam ? winnerTeam.team_id : null;

    return {
        riotMatchId: metadata.match_id,
        seriesId: contextData.seriesId, // User input
        matchNumber: contextData.matchNumber, // User input
        mapId: metadata.map.id,
        mapName: metadata.map.name,
        gameLengthMs: metadata.game_length_in_ms,
        startedAt: new Date(metadata.started_at),
        completedAt: metadata.is_completed ? new Date(metadata.started_at) : null,
        isCompleted: metadata.is_completed,
        status: metadata.is_completed ? "completed" : "in_progress",
        winnerTeamSide,
    };
};

/**
 * Parse player data and calculate advanced statistics
 * @param {Object} matchData - Raw match data from Valorant API
 * @returns {Array} Array of parsed player objects
 */
const parsePlayersData = (matchData) => {
    const players = matchData.data.players;
    const rounds = matchData.data.rounds;
    const totalRounds = rounds.length;
    const allKills = matchData.data.kills;

    // Organize kills by round for first blood/death calculations
    const roundKills = organizeKillsByRound(allKills, totalRounds);

    return players.map(player => {
        const stats = player.stats;
        const { plants, defuses } = calculatePlantsAndDefuses(rounds, player.puuid);

        // Calculate advanced statistics
        const hsPercentage = calculateHeadshotPercentage(
            stats.headshots,
            stats.bodyshots,
            stats.legshots
        );
        const kd = calculateKDRatio(stats.kills, stats.deaths);
        const kda = calculateKDA(stats.kills, stats.deaths, stats.assists);
        const acs = calculateACS(stats.score, totalRounds);
        const adr = calculateADR(stats.damage.dealt, totalRounds);
        const firstBloods = calculateFirstBloods(roundKills, player.puuid);
        const firstDeaths = calculateFirstDeaths(roundKills, player.puuid);

        return {
            puuid: player.puuid,
            name: player.name,
            tag: player.tag,
            teamId: player.team_id,
            agentId: player.agent.id,
            agentName: player.agent.name,
            stats: {
                score: stats.score,
                kills: stats.kills,
                deaths: stats.deaths,
                assists: stats.assists,
                headshots: stats.headshots,
                bodyshots: stats.bodyshots,
                legshots: stats.legshots,
                headshotPercentage: hsPercentage,
                kd,
                kda,
                acs,
                adr,
                firstBloods,
                firstDeaths,
                plants,
                defuses,
                damageDealt: stats.damage.dealt,
                damageReceived: stats.damage.received,
            },
            abilityCasts: player.ability_casts,
            economy: player.economy,
        };
    });
};

/**
 * Parse round data
 * @param {Object} matchData - Raw match data from Valorant API
 * @returns {Array} Array of parsed round objects
 */
const parseRoundsData = (matchData) => {
    const rounds = matchData.data.rounds;

    return rounds.map((round, index) => ({
        roundNumber: index + 1, // 1-indexed for display
        result: round.result,
        winningTeam: round.winning_team,
        ceremony: round.ceremony,
        plant: round.plant ? {
            roundTimeMs: round.plant.round_time_in_ms,
            site: round.plant.site,
            locationX: round.plant.location.x,
            locationY: round.plant.location.y,
            playerPuuid: round.plant.player.puuid,
            playerName: round.plant.player.name,
            playerTag: round.plant.player.tag,
            playerTeam: round.plant.player.team,
        } : null,
        defuse: round.defuse ? {
            roundTimeMs: round.defuse.round_time_in_ms,
            locationX: round.defuse.location.x,
            locationY: round.defuse.location.y,
            playerPuuid: round.defuse.player.puuid,
            playerName: round.defuse.player.name,
            playerTag: round.defuse.player.tag,
            playerTeam: round.defuse.player.team,
        } : null,
    }));
};

/**
 * Parse round player stats
 * @param {Object} matchData - Raw match data from Valorant API
 * @param {number} matchId - Database match ID (after match is created)
 * @param {Object} matchParticipationMap - Map of puuid to matchParticipationId
 * @returns {Array} Array of round player stat objects
 */
const parseRoundPlayerStats = (matchData, matchId, matchParticipationMap) => {
    const rounds = matchData.data.rounds;
    const allRoundStats = [];

    rounds.forEach((round, roundIndex) => {
        if (round.stats && round.stats.length > 0) {
            round.stats.forEach(playerStat => {
                const puuid = playerStat.player.puuid;
                const matchParticipationId = matchParticipationMap[puuid];

                if (!matchParticipationId) {
                    console.warn(`No match participation found for player ${puuid}`);
                    return;
                }

                allRoundStats.push({
                    roundId: matchId, // This will need to be the actual round DB ID
                    roundNumber: roundIndex + 1,
                    matchParticipationId,
                    playerPuuid: puuid,
                    score: playerStat.stats.score || 0,
                    kills: playerStat.stats.kills || 0,
                    headshots: playerStat.stats.headshots || 0,
                    bodyshots: playerStat.stats.bodyshots || 0,
                    legshots: playerStat.stats.legshots || 0,
                    damageDealt: playerStat.stats.damage || 0,
                    grenadeCasts: playerStat.ability_casts?.grenade || null,
                    ability1Casts: playerStat.ability_casts?.ability_1 || null,
                    ability2Casts: playerStat.ability_casts?.ability_2 || null,
                    ultimateCasts: playerStat.ability_casts?.ultimate || null,
                    weaponId: playerStat.weapon?.id || null,
                    weaponName: playerStat.weapon?.name || null,
                    armorId: playerStat.armor?.id || null,
                    armorName: playerStat.armor?.name || null,
                    loadoutValue: playerStat.loadout_value || null,
                    creditsRemaining: playerStat.remaining_credits || null,
                });
            });
        }
    });

    return allRoundStats;
};

/**
 * Parse kills from match data
 * @param {Object} matchData - Raw match data from Valorant API
 * @param {number} matchId - Database match ID
 * @returns {Array} Array of kill objects
 */
const parseKills = (matchData, matchId) => {
    const kills = matchData.data.kills;
    const allKills = [];

    kills.forEach(kill => {
        allKills.push({
            matchId,
            roundNumber: kill.round + 1, // Convert 0-indexed to 1-indexed
            timeInRoundMs: kill.time_in_round_in_ms,
            timeInMatchMs: kill.time_in_match_in_ms,
            killerPuuid: kill.killer.puuid,
            victimPuuid: kill.victim.puuid,
            locationX: kill.location?.x || null,
            locationY: kill.location?.y || null,
            weaponId: kill.weapon?.id || null,
            weaponName: kill.weapon?.name || null,
            weaponType: kill.weapon?.type || null,
            secondaryFireMode: kill.secondary_fire_mode || false,
        });
    });

    return allKills;
};

/**
 * Parse round team stats
 * @param {Object} matchData - Raw match data from Valorant API
 * @param {Object} teamIdMap - Map of team_id (Red/Blue) to database team ID
 * @returns {Array} Array of round team stat objects
 */
const parseRoundTeamStats = (matchData, teamIdMap) => {
    const rounds = matchData.data.rounds;
    const roundTeamStats = [];

    rounds.forEach((round, roundIndex) => {
        // Create stats for both teams
        ['Red', 'Blue'].forEach(teamId => {
            const dbTeamId = teamIdMap[teamId];
            if (!dbTeamId) {
                console.warn(`No team mapping found for ${teamId}`);
                return;
            }

            const won = round.winning_team === teamId;
            const teamSide = mapTeamIdToSide(teamId, roundIndex);

            roundTeamStats.push({
                roundNumber: roundIndex + 1,
                teamId: dbTeamId,
                teamSide,
                won,
            });
        });
    });

    return roundTeamStats;
};

/**
 * Main parser function - orchestrates all parsing
 * @param {Object} matchData - Raw match data from Valorant API
 * @param {Object} context - User-provided context
 * @returns {Object} Fully parsed match data ready for database insertion
 */
const parseMatchData = (matchData, context) => {
    const match = parseMatchMetadata(matchData, context);
    const players = parsePlayersData(matchData);
    const rounds = parseRoundsData(matchData);

    // Note: kills, roundPlayerStats, and roundTeamStats will need database IDs
    // These should be parsed after initial entities are created

    return {
        match,
        players,
        rounds,
        rawData: matchData, // Keep for reference if needed
    };
};

/**
 * Import match data to database
 * @param {Object} matchData - Raw match data from Valorant API
 * @param {Object} context - Import context {seriesId, matchNumber, teamMappings}
 * @returns {Promise<Object>} Import result with created record IDs
 */
const importMatchToDatabase = async (matchData, context) => {
    const { seriesId, matchNumber, teamMappings } = context;

    // Check if match already exists
    const existingMatch = await findMatchByRiotId(matchData.data.metadata.match_id);
    if (existingMatch) {
        throw new Error(`Match with Riot ID ${matchData.data.metadata.match_id} already exists in database`);
    }

    // Parse match data
    const parsedData = parseMatchData(matchData, { seriesId, matchNumber });

    // Step 1: Upsert all players first
    const playerMap = new Map(); // puuid -> player DB record
    for (const playerData of parsedData.players) {
        const player = await upsertPlayer({
            puuid: playerData.puuid,
            name: playerData.name,
            tag: playerData.tag,
        });
        playerMap.set(playerData.puuid, player);
    }

    // Step 2: Create match record
    const match = await createMatch({
        seriesId: parsedData.match.seriesId,
        matchNumber: parsedData.match.matchNumber,
        riotMatchId: parsedData.match.riotMatchId,
        mapId: parsedData.match.mapId,
        gameLengthMs: parsedData.match.gameLengthMs,
        startedAt: parsedData.match.startedAt,
        completedAt: parsedData.match.completedAt,
        isCompleted: parsedData.match.isCompleted,
        status: parsedData.match.status,
        winnerTeamSide: parsedData.match.winnerTeamSide,
    });

    // Step 3: Create match participations and player stats
    const participationMap = new Map(); // puuid -> matchParticipation DB record
    for (const playerData of parsedData.players) {
        const player = playerMap.get(playerData.puuid);
        const teamId = teamMappings[playerData.teamId]; // Map Red/Blue to actual team IDs

        if (!teamId) {
            throw new Error(`No team mapping found for ${playerData.teamId}`);
        }

        // Determine team side (Attack/Defense) - we'll use the first round as reference
        const teamSide = mapTeamIdToSide(playerData.teamId, 0);

        // Create match participation
        const participation = await createMatchParticipation({
            matchId: match.id,
            playerId: player.id,
            teamId: teamId,
            teamSide: teamSide,
            agentId: playerData.agentId,
        });

        participationMap.set(playerData.puuid, participation);

        // Create match player stats
        await createMatchPlayerStats({
            matchParticipationId: participation.id,
            matchId: match.id,
            playerId: player.id,
            agentId: playerData.agentId,
            agentName: playerData.agentName,
            score: playerData.stats.score,
            kills: playerData.stats.kills,
            deaths: playerData.stats.deaths,
            assists: playerData.stats.assists,
            headshots: playerData.stats.headshots,
            bodyshots: playerData.stats.bodyshots,
            legshots: playerData.stats.legshots,
            damageDealt: playerData.stats.damageDealt,
            damageReceived: playerData.stats.damageReceived,
            adr: playerData.stats.adr,
            acs: playerData.stats.acs,
            kd: playerData.stats.kd,
            hsPercent: playerData.stats.headshotPercentage,
            firstKills: playerData.stats.firstBloods,
            firstDeaths: playerData.stats.firstDeaths,
            grenadeCasts: playerData.abilityCasts?.grenade || null,
            ability1Casts: playerData.abilityCasts?.ability1 || null,
            ability2Casts: playerData.abilityCasts?.ability2 || null,
            ultimateCasts: playerData.abilityCasts?.ultimate || null,
            spentOverall: playerData.economy?.spent?.overall || null,
            spentAverage: playerData.economy?.spent?.average || null,
            loadoutOverall: playerData.economy?.loadout_value?.overall || null,
            loadoutAverage: playerData.economy?.loadout_value?.average || null,
        });
    }

    // Step 4: Create rounds
    const roundMap = new Map(); // roundNumber -> round DB record
    for (const roundData of parsedData.rounds) {
        const round = await createRound({
            matchId: match.id,
            roundNumber: roundData.roundNumber,
            result: roundData.result,
            winningTeam: roundData.winningTeam,
        });

        roundMap.set(roundData.roundNumber, round);

        // Create plant if exists
        if (roundData.plant) {
            const planter = playerMap.get(roundData.plant.playerPuuid);
            await createPlant({
                roundId: round.id,
                playerId: planter.id,
                roundTimeMs: roundData.plant.roundTimeMs,
                site: roundData.plant.site,
                locationX: roundData.plant.locationX,
                locationY: roundData.plant.locationY,
            });
        }

        // Create defuse if exists
        if (roundData.defuse) {
            const defuser = playerMap.get(roundData.defuse.playerPuuid);
            await createDefuse({
                roundId: round.id,
                playerId: defuser.id,
                roundTimeMs: roundData.defuse.roundTimeMs,
                locationX: roundData.defuse.locationX,
                locationY: roundData.defuse.locationY,
            });
        }
    }

    // Step 5: Create round player stats
    const roundPlayerStatsData = parseRoundPlayerStats(
        matchData,
        match.id,
        Object.fromEntries(
            Array.from(participationMap.entries()).map(([puuid, participation]) => [
                puuid,
                participation.id,
            ])
        )
    );

    for (const statData of roundPlayerStatsData) {
        const round = roundMap.get(statData.roundNumber);
        const player = playerMap.get(statData.playerPuuid);

        await createRoundPlayerStats({
            roundId: round.id,
            matchParticipationId: statData.matchParticipationId,
            playerId: player.id,
            score: statData.score,
            kills: statData.kills,
            headshots: statData.headshots,
            bodyshots: statData.bodyshots,
            legshots: statData.legshots,
            grenadeCasts: statData.grenadeCasts,
            ability1Casts: statData.ability1Casts,
            ability2Casts: statData.ability2Casts,
            ultimateCasts: statData.ultimateCasts,
            loadoutValue: statData.loadoutValue,
            creditsRemaining: statData.creditsRemaining,
            weaponId: statData.weaponId,
            weaponName: statData.weaponName,
            armorId: statData.armorId,
            armorName: statData.armorName,
        });
    }

    // Step 6: Create round team stats
    const roundTeamStatsData = parseRoundTeamStats(matchData, teamMappings);

    for (const statData of roundTeamStatsData) {
        const round = roundMap.get(statData.roundNumber);

        await createRoundTeamStats({
            roundId: round.id,
            teamId: statData.teamId,
            teamSide: statData.teamSide,
            won: statData.won,
        });
    }

    // Step 7: Create match team stats
    const teams = matchData.data.teams;
    for (const teamData of teams) {
        const teamId = teamMappings[teamData.team_id];
        if (!teamId) continue;

        await createMatchTeamStats({
            matchId: match.id,
            teamId: teamId,
            teamSide: teamData.team_id, // Red or Blue
            roundsWon: teamData.rounds.won,
            roundsLost: teamData.rounds.lost,
            won: teamData.won,
        });
    }

    // Step 8: Create kills
    const killsData = parseKills(matchData, match.id);

    for (const killData of killsData) {
        const killer = playerMap.get(killData.killerPuuid);
        const victim = playerMap.get(killData.victimPuuid);

        await createKill({
            matchId: match.id,
            roundNumber: killData.roundNumber,
            timeInRoundMs: killData.timeInRoundMs,
            timeInMatchMs: killData.timeInMatchMs,
            killerId: killer.id,
            victimId: victim.id,
            locationX: killData.locationX,
            locationY: killData.locationY,
            weaponId: killData.weaponId,
            weaponName: killData.weaponName,
            weaponType: killData.weaponType,
            secondaryFireMode: killData.secondaryFireMode,
        });
    }

    return {
        matchId: match.id,
        riotMatchId: match.riotMatchId,
        playersImported: playerMap.size,
        roundsImported: roundMap.size,
        killsImported: killsData.length,
    };
};

module.exports = {
    parseMatchData,
    parseMatchMetadata,
    parsePlayersData,
    parseRoundsData,
    parseRoundPlayerStats,
    parseKills,
    parseRoundTeamStats,
    importMatchToDatabase,
};

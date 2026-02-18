import {
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
} from "./matchParser.utils";

import * as matchParserRepository from "./matchParser.repository";

/**
 * Parse match metadata from API response
 */
const parseMatchMetadata = (matchData: any, contextData: any) => {
  const metadata = matchData.data.metadata;
  const teams = matchData.data.teams;

  const winnerTeam = teams.find((t: any) => t.won === true);
  const winnerTeamSide = winnerTeam ? winnerTeam.team_id : null;

  return {
    riotMatchId: metadata.match_id,
    seriesId: contextData.seriesId,
    matchNumber: contextData.matchNumber,
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
 */
const parsePlayersData = (matchData: any) => {
  const players = matchData.data.players;
  const rounds = matchData.data.rounds;
  const totalRounds = rounds.length;
  const allKills = matchData.data.kills;

  const roundKills = organizeKillsByRound(allKills, totalRounds);

  return players.map((player: any) => {
    const stats = player.stats;
    const { plants, defuses } = calculatePlantsAndDefuses(rounds, player.puuid);

    const hsPercentage = calculateHeadshotPercentage(
      stats.headshots,
      stats.bodyshots,
      stats.legshots,
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
 */
const parseRoundsData = (matchData: any) => {
  const rounds = matchData.data.rounds;

  return rounds.map((round: any, index: number) => ({
    roundNumber: index + 1,
    result: round.result,
    winningTeam: round.winning_team,
    ceremony: round.ceremony,
    plant: round.plant
      ? {
          roundTimeMs: round.plant.round_time_in_ms,
          site: round.plant.site,
          locationX: round.plant.location.x,
          locationY: round.plant.location.y,
          playerPuuid: round.plant.player.puuid,
          playerName: round.plant.player.name,
          playerTag: round.plant.player.tag,
          playerTeam: round.plant.player.team,
        }
      : null,
    defuse: round.defuse
      ? {
          roundTimeMs: round.defuse.round_time_in_ms,
          locationX: round.defuse.location.x,
          locationY: round.defuse.location.y,
          playerPuuid: round.defuse.player.puuid,
          playerName: round.defuse.player.name,
          playerTag: round.defuse.player.tag,
          playerTeam: round.defuse.player.team,
        }
      : null,
  }));
};

/**
 * Parse round player stats
 */
const parseRoundPlayerStats = (
  matchData: any,
  matchId: number,
  matchParticipationMap: Record<string, number>,
) => {
  const rounds = matchData.data.rounds;
  const allRoundStats: any[] = [];

  rounds.forEach((round: any, roundIndex: number) => {
    if (round.stats && round.stats.length > 0) {
      round.stats.forEach((playerStat: any) => {
        const puuid = playerStat.player.puuid;
        const matchParticipationId = matchParticipationMap[puuid];

        if (!matchParticipationId) {
          console.warn(`No match participation found for player ${puuid}`);
          return;
        }

        allRoundStats.push({
          roundId: matchId,
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
 */
const parseKills = (matchData: any, matchId: number) => {
  const kills = matchData.data.kills;
  const allKills: any[] = [];

  kills.forEach((kill: any) => {
    allKills.push({
      matchId,
      roundNumber: kill.round + 1,
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
 */
const parseRoundTeamStats = (
  matchData: any,
  teamIdMap: Record<string, number>,
) => {
  const rounds = matchData.data.rounds;
  const roundTeamStats: any[] = [];

  rounds.forEach((round: any, roundIndex: number) => {
    ["Red", "Blue"].forEach((teamId) => {
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
 */
export const parseMatchData = (matchData: any, context: any) => {
  const match = parseMatchMetadata(matchData, context);
  const players = parsePlayersData(matchData);
  const rounds = parseRoundsData(matchData);

  return {
    match,
    players,
    rounds,
    rawData: matchData,
  };
};

/**
 * Import match data to database
 */
export const importMatchToDatabase = async (matchData: any, context: any) => {
  const { seriesId, matchNumber, teamMappings } = context;

  const existingMatch = await matchParserRepository.findMatchByRiotId(
    matchData.data.metadata.match_id,
  );
  if (existingMatch) {
    throw new Error(
      `Match with Riot ID ${matchData.data.metadata.match_id} already exists in database`,
    );
  }

  const parsedData = parseMatchData(matchData, { seriesId, matchNumber });

  const playerMap = new Map();
  for (const playerData of parsedData.players) {
    const player = await matchParserRepository.upsertPlayer({
      puuid: playerData.puuid,
      name: playerData.name,
      tag: playerData.tag,
    });
    playerMap.set(playerData.puuid, player);
  }

  const match = await matchParserRepository.createMatch({
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

  const participationMap = new Map();
  for (const playerData of parsedData.players) {
    const player = playerMap.get(playerData.puuid);
    const teamId = teamMappings[playerData.teamId];

    if (!teamId) {
      throw new Error(`No team mapping found for ${playerData.teamId}`);
    }

    const teamSide = mapTeamIdToSide(playerData.teamId, 0);

    const participation = await matchParserRepository.createMatchParticipation({
      matchId: match.id,
      playerId: player.id,
      teamId: teamId,
      teamSide: teamSide,
      agentId: playerData.agentId,
    });

    participationMap.set(playerData.puuid, participation);

    await matchParserRepository.createMatchPlayerStats({
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

  const roundMap = new Map();
  for (const roundData of parsedData.rounds) {
    const round = await matchParserRepository.createRound({
      matchId: match.id,
      roundNumber: roundData.roundNumber,
      result: roundData.result,
      winningTeam: roundData.winningTeam,
    });

    roundMap.set(roundData.roundNumber, round);

    if (roundData.plant) {
      const planter = playerMap.get(roundData.plant.playerPuuid);
      await matchParserRepository.createPlant({
        roundId: round.id,
        playerId: planter.id,
        roundTimeMs: roundData.plant.roundTimeMs,
        site: roundData.plant.site,
        locationX: roundData.plant.locationX,
        locationY: roundData.plant.locationY,
      });
    }

    if (roundData.defuse) {
      const defuser = playerMap.get(roundData.defuse.playerPuuid);
      await matchParserRepository.createDefuse({
        roundId: round.id,
        playerId: defuser.id,
        roundTimeMs: roundData.defuse.roundTimeMs,
        locationX: roundData.defuse.locationX,
        locationY: roundData.defuse.locationY,
      });
    }
  }

  const roundPlayerStatsData = parseRoundPlayerStats(
    matchData,
    match.id,
    Object.fromEntries(
      Array.from(participationMap.entries()).map(
        ([puuid, participation]: any) => [puuid, participation.id],
      ),
    ),
  );

  for (const statData of roundPlayerStatsData) {
    const round = roundMap.get(statData.roundNumber);
    const player = playerMap.get(statData.playerPuuid);

    await matchParserRepository.createRoundPlayerStats({
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

  const roundTeamStatsData = parseRoundTeamStats(matchData, teamMappings);

  for (const statData of roundTeamStatsData) {
    const round = roundMap.get(statData.roundNumber);

    await matchParserRepository.createRoundTeamStats({
      roundId: round.id,
      teamId: statData.teamId,
      teamSide: statData.teamSide,
      won: statData.won,
    });
  }

  const teams = matchData.data.teams;
  for (const teamData of teams) {
    const teamId = teamMappings[teamData.team_id];
    if (!teamId) continue;

    await matchParserRepository.createMatchTeamStats({
      matchId: match.id,
      teamId: teamId,
      teamSide: teamData.team_id,
      roundsWon: teamData.rounds.won,
      roundsLost: teamData.rounds.lost,
      won: teamData.won,
    });
  }

  const killsData = parseKills(matchData, match.id);

  for (const killData of killsData) {
    const killer = playerMap.get(killData.killerPuuid);
    const victim = playerMap.get(killData.victimPuuid);

    await matchParserRepository.createKill({
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

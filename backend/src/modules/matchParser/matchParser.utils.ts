/**
 * Utility functions for parsing and calculating Valorant match statistics
 */

/**
 * Calculate headshot percentage
 */
export const calculateHeadshotPercentage = (
  headshots: number,
  bodyshots: number,
  legshots: number,
): number => {
  const totalShots = headshots + bodyshots + legshots;
  if (totalShots === 0) return 0;
  return Number(((headshots / totalShots) * 100).toFixed(2));
};

/**
 * Calculate K/D ratio
 */
export const calculateKDRatio = (kills: number, deaths: number): number => {
  if (deaths === 0) return kills;
  return Number((kills / deaths).toFixed(2));
};

/**
 * Calculate K/D/A ratio
 */
export const calculateKDA = (
  kills: number,
  deaths: number,
  assists: number,
): number => {
  if (deaths === 0) return kills + assists;
  return Number(((kills + assists) / deaths).toFixed(2));
};

/**
 * Calculate average combat score per round
 */
export const calculateACS = (totalScore: number, rounds: number): number => {
  if (rounds === 0) return 0;
  return Number((totalScore / rounds).toFixed(1));
};

/**
 * Calculate average damage per round
 */
export const calculateADR = (totalDamage: number, rounds: number): number => {
  if (rounds === 0) return 0;
  return Number((totalDamage / rounds).toFixed(1));
};

interface RoundKill {
  killer: string;
  victim: string;
  weapon: string;
  time: number;
}

/**
 * Calculate first bloods
 */
export const calculateFirstBloods = (
  roundKills: RoundKill[][],
  puuid: string,
): number => {
  let firstBloods = 0;
  for (const roundKillsList of roundKills) {
    if (roundKillsList && roundKillsList.length > 0) {
      if (roundKillsList[0].killer === puuid) {
        firstBloods++;
      }
    }
  }
  return firstBloods;
};

/**
 * Calculate first deaths
 */
export const calculateFirstDeaths = (
  roundKills: RoundKill[][],
  puuid: string,
): number => {
  let firstDeaths = 0;
  for (const roundKillsList of roundKills) {
    if (roundKillsList && roundKillsList.length > 0) {
      if (roundKillsList[0].victim === puuid) {
        firstDeaths++;
      }
    }
  }
  return firstDeaths;
};

/**
 * Determine team side for a round
 */
const getTeamSideForRound = (
  roundNumber: number,
  initialSide: string,
): string => {
  const isSwapped = roundNumber >= 12;

  if (initialSide === "Red") {
    return isSwapped ? "Defense" : "Attack";
  } else {
    return isSwapped ? "Attack" : "Defense";
  }
};

/**
 * Map team_id to standardized team side
 */
export const mapTeamIdToSide = (
  teamId: string,
  roundNumber: number,
): string => {
  return getTeamSideForRound(roundNumber, teamId);
};

/**
 * Extract player IDs (PUUIDs) for a team
 */
export const getTeamPlayerIds = (players: any[], teamId: string): string[] => {
  return players.filter((p) => p.team_id === teamId).map((p) => p.puuid);
};

/**
 * Calculate plants and defuses for a player
 */
export const calculatePlantsAndDefuses = (
  rounds: any[],
  puuid: string,
): { plants: number; defuses: number } => {
  let plants = 0;
  let defuses = 0;

  for (const round of rounds) {
    if (round.plant && round.plant.player.puuid === puuid) {
      plants++;
    }
    if (round.defuse && round.defuse.player.puuid === puuid) {
      defuses++;
    }
  }

  return { plants, defuses };
};

/**
 * Organize kills by round
 */
export const organizeKillsByRound = (
  allKills: any[],
  totalRounds: number,
): RoundKill[][] => {
  const killsByRound: RoundKill[][] = Array.from(
    { length: totalRounds },
    () => [],
  );

  for (const kill of allKills) {
    const roundIndex = kill.round;
    if (roundIndex >= 0 && roundIndex < totalRounds) {
      killsByRound[roundIndex].push({
        killer: kill.killer.puuid,
        victim: kill.victim.puuid,
        weapon: kill.weapon?.name || "Unknown",
        time: kill.time_in_round_in_ms,
      });
    }
  }

  return killsByRound;
};

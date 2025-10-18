-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "redTeamId" INTEGER NOT NULL,
    "blueTeamId" INTEGER NOT NULL,
    "bestOf" INTEGER NOT NULL,
    "winnerTeamId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "riotMatchId" TEXT,
    "mapId" TEXT,
    "gameLengthMs" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "winnerTeamSide" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchParticipation" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "teamSide" TEXT NOT NULL,
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPlayerStats" (
    "id" SERIAL NOT NULL,
    "matchParticipationId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "agentId" TEXT,
    "agentName" TEXT,
    "score" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "headshots" INTEGER NOT NULL,
    "bodyshots" INTEGER NOT NULL,
    "legshots" INTEGER NOT NULL,
    "damageDealt" INTEGER NOT NULL,
    "damageReceived" INTEGER NOT NULL,
    "adr" DOUBLE PRECISION,
    "acs" DOUBLE PRECISION,
    "kd" DOUBLE PRECISION,
    "hsPercent" DOUBLE PRECISION,
    "kast" DOUBLE PRECISION,
    "firstKills" INTEGER,
    "firstDeaths" INTEGER,
    "grenadeCasts" INTEGER,
    "ability1Casts" INTEGER,
    "ability2Casts" INTEGER,
    "ultimateCasts" INTEGER,
    "spentOverall" INTEGER,
    "spentAverage" DOUBLE PRECISION,
    "loadoutOverall" INTEGER,
    "loadoutAverage" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchPlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTeamStats" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "teamSide" TEXT NOT NULL,
    "roundsWon" INTEGER NOT NULL,
    "roundsLost" INTEGER NOT NULL,
    "won" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchTeamStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "ceremony" TEXT,
    "winningTeam" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "roundTimeMs" INTEGER NOT NULL,
    "site" TEXT NOT NULL,
    "locationX" DOUBLE PRECISION,
    "locationY" DOUBLE PRECISION,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Defuse" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "roundTimeMs" INTEGER NOT NULL,
    "locationX" DOUBLE PRECISION,
    "locationY" DOUBLE PRECISION,

    CONSTRAINT "Defuse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundPlayerStats" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "matchParticipationId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "headshots" INTEGER NOT NULL,
    "bodyshots" INTEGER NOT NULL,
    "legshots" INTEGER NOT NULL,
    "grenadeCasts" INTEGER,
    "ability1Casts" INTEGER,
    "ability2Casts" INTEGER,
    "ultimateCasts" INTEGER,
    "loadoutValue" INTEGER,
    "creditsRemaining" INTEGER,
    "weaponId" TEXT,
    "weaponName" TEXT,
    "armorId" TEXT,
    "armorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoundPlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundTeamStats" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "teamSide" TEXT NOT NULL,
    "won" BOOLEAN NOT NULL,

    CONSTRAINT "RoundTeamStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kill" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "timeInRoundMs" INTEGER NOT NULL,
    "timeInMatchMs" INTEGER NOT NULL,
    "killerId" INTEGER NOT NULL,
    "victimId" INTEGER NOT NULL,
    "locationX" DOUBLE PRECISION,
    "locationY" DOUBLE PRECISION,
    "weaponId" TEXT,
    "weaponName" TEXT,
    "weaponType" TEXT,
    "secondaryFireMode" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRoster" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Substitution" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "substitutedInId" INTEGER NOT NULL,
    "substitutedOutId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Substitution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Assistant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Assistant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_name_key" ON "Agent"("name");

-- CreateIndex
CREATE INDEX "Agent_role_idx" ON "Agent"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "Map"("name");

-- CreateIndex
CREATE INDEX "Map_name_idx" ON "Map"("name");

-- CreateIndex
CREATE UNIQUE INDEX "League_name_key" ON "League"("name");

-- CreateIndex
CREATE INDEX "League_name_idx" ON "League"("name");

-- CreateIndex
CREATE INDEX "Season_startDate_idx" ON "Season"("startDate");

-- CreateIndex
CREATE INDEX "Season_leagueId_idx" ON "Season"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_leagueId_name_key" ON "Season"("leagueId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE INDEX "Team_name_idx" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Player_puuid_key" ON "Player"("puuid");

-- CreateIndex
CREATE INDEX "Player_puuid_idx" ON "Player"("puuid");

-- CreateIndex
CREATE INDEX "Player_name_tag_idx" ON "Player"("name", "tag");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_tag_key" ON "Player"("name", "tag");

-- CreateIndex
CREATE INDEX "Series_seasonId_idx" ON "Series"("seasonId");

-- CreateIndex
CREATE INDEX "Series_redTeamId_idx" ON "Series"("redTeamId");

-- CreateIndex
CREATE INDEX "Series_blueTeamId_idx" ON "Series"("blueTeamId");

-- CreateIndex
CREATE INDEX "Series_startDate_idx" ON "Series"("startDate");

-- CreateIndex
CREATE INDEX "Series_status_idx" ON "Series"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Match_riotMatchId_key" ON "Match"("riotMatchId");

-- CreateIndex
CREATE INDEX "Match_seriesId_idx" ON "Match"("seriesId");

-- CreateIndex
CREATE INDEX "Match_mapId_idx" ON "Match"("mapId");

-- CreateIndex
CREATE INDEX "Match_startedAt_idx" ON "Match"("startedAt");

-- CreateIndex
CREATE INDEX "Match_riotMatchId_idx" ON "Match"("riotMatchId");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Match_seriesId_matchNumber_key" ON "Match"("seriesId", "matchNumber");

-- CreateIndex
CREATE INDEX "MatchParticipation_matchId_idx" ON "MatchParticipation"("matchId");

-- CreateIndex
CREATE INDEX "MatchParticipation_playerId_idx" ON "MatchParticipation"("playerId");

-- CreateIndex
CREATE INDEX "MatchParticipation_teamId_idx" ON "MatchParticipation"("teamId");

-- CreateIndex
CREATE INDEX "MatchParticipation_agentId_idx" ON "MatchParticipation"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchParticipation_matchId_playerId_key" ON "MatchParticipation"("matchId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayerStats_matchParticipationId_key" ON "MatchPlayerStats"("matchParticipationId");

-- CreateIndex
CREATE INDEX "MatchPlayerStats_matchId_idx" ON "MatchPlayerStats"("matchId");

-- CreateIndex
CREATE INDEX "MatchPlayerStats_playerId_idx" ON "MatchPlayerStats"("playerId");

-- CreateIndex
CREATE INDEX "MatchTeamStats_matchId_idx" ON "MatchTeamStats"("matchId");

-- CreateIndex
CREATE INDEX "MatchTeamStats_teamId_idx" ON "MatchTeamStats"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchTeamStats_matchId_teamId_key" ON "MatchTeamStats"("matchId", "teamId");

-- CreateIndex
CREATE INDEX "Round_matchId_idx" ON "Round"("matchId");

-- CreateIndex
CREATE INDEX "Round_winningTeam_idx" ON "Round"("winningTeam");

-- CreateIndex
CREATE UNIQUE INDEX "Round_matchId_roundNumber_key" ON "Round"("matchId", "roundNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_roundId_key" ON "Plant"("roundId");

-- CreateIndex
CREATE INDEX "Plant_playerId_idx" ON "Plant"("playerId");

-- CreateIndex
CREATE INDEX "Plant_site_idx" ON "Plant"("site");

-- CreateIndex
CREATE UNIQUE INDEX "Defuse_roundId_key" ON "Defuse"("roundId");

-- CreateIndex
CREATE INDEX "Defuse_playerId_idx" ON "Defuse"("playerId");

-- CreateIndex
CREATE INDEX "RoundPlayerStats_roundId_idx" ON "RoundPlayerStats"("roundId");

-- CreateIndex
CREATE INDEX "RoundPlayerStats_playerId_idx" ON "RoundPlayerStats"("playerId");

-- CreateIndex
CREATE INDEX "RoundPlayerStats_matchParticipationId_idx" ON "RoundPlayerStats"("matchParticipationId");

-- CreateIndex
CREATE UNIQUE INDEX "RoundPlayerStats_roundId_matchParticipationId_key" ON "RoundPlayerStats"("roundId", "matchParticipationId");

-- CreateIndex
CREATE INDEX "RoundTeamStats_roundId_idx" ON "RoundTeamStats"("roundId");

-- CreateIndex
CREATE INDEX "RoundTeamStats_teamId_idx" ON "RoundTeamStats"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "RoundTeamStats_roundId_teamId_key" ON "RoundTeamStats"("roundId", "teamId");

-- CreateIndex
CREATE INDEX "Kill_matchId_idx" ON "Kill"("matchId");

-- CreateIndex
CREATE INDEX "Kill_killerId_idx" ON "Kill"("killerId");

-- CreateIndex
CREATE INDEX "Kill_victimId_idx" ON "Kill"("victimId");

-- CreateIndex
CREATE INDEX "Kill_roundNumber_idx" ON "Kill"("roundNumber");

-- CreateIndex
CREATE INDEX "TeamRoster_teamId_idx" ON "TeamRoster"("teamId");

-- CreateIndex
CREATE INDEX "TeamRoster_playerId_idx" ON "TeamRoster"("playerId");

-- CreateIndex
CREATE INDEX "TeamRoster_seasonId_idx" ON "TeamRoster"("seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_playerId_teamId_seasonId_key" ON "TeamRoster"("playerId", "teamId", "seasonId");

-- CreateIndex
CREATE INDEX "Substitution_matchId_idx" ON "Substitution"("matchId");

-- CreateIndex
CREATE INDEX "Substitution_teamId_idx" ON "Substitution"("teamId");

-- CreateIndex
CREATE INDEX "Substitution_substitutedInId_idx" ON "Substitution"("substitutedInId");

-- CreateIndex
CREATE INDEX "Substitution_substitutedOutId_idx" ON "Substitution"("substitutedOutId");

-- CreateIndex
CREATE INDEX "_Assistant_B_index" ON "_Assistant"("B");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_redTeamId_fkey" FOREIGN KEY ("redTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_blueTeamId_fkey" FOREIGN KEY ("blueTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipation" ADD CONSTRAINT "MatchParticipation_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipation" ADD CONSTRAINT "MatchParticipation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipation" ADD CONSTRAINT "MatchParticipation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchParticipation" ADD CONSTRAINT "MatchParticipation_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayerStats" ADD CONSTRAINT "MatchPlayerStats_matchParticipationId_fkey" FOREIGN KEY ("matchParticipationId") REFERENCES "MatchParticipation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayerStats" ADD CONSTRAINT "MatchPlayerStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayerStats" ADD CONSTRAINT "MatchPlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayerStats" ADD CONSTRAINT "MatchPlayerStats_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeamStats" ADD CONSTRAINT "MatchTeamStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeamStats" ADD CONSTRAINT "MatchTeamStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Defuse" ADD CONSTRAINT "Defuse_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Defuse" ADD CONSTRAINT "Defuse_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundPlayerStats" ADD CONSTRAINT "RoundPlayerStats_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundPlayerStats" ADD CONSTRAINT "RoundPlayerStats_matchParticipationId_fkey" FOREIGN KEY ("matchParticipationId") REFERENCES "MatchParticipation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundPlayerStats" ADD CONSTRAINT "RoundPlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundTeamStats" ADD CONSTRAINT "RoundTeamStats_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundTeamStats" ADD CONSTRAINT "RoundTeamStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kill" ADD CONSTRAINT "Kill_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kill" ADD CONSTRAINT "Kill_killerId_fkey" FOREIGN KEY ("killerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kill" ADD CONSTRAINT "Kill_victimId_fkey" FOREIGN KEY ("victimId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_substitutedInId_fkey" FOREIGN KEY ("substitutedInId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_substitutedOutId_fkey" FOREIGN KEY ("substitutedOutId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Assistant" ADD CONSTRAINT "_Assistant_A_fkey" FOREIGN KEY ("A") REFERENCES "Kill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Assistant" ADD CONSTRAINT "_Assistant_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

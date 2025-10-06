/*
  Warnings:

  - You are about to drop the column `blueTeamId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `map` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `redTeamId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `agents` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `clutchpercent` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `delta` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `hs` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `kdRatio` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `mkills` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `plusMinus` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[riotMatchId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seriesId,mapNumber]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamRosterId,MatchId]` on the table `PlayerStats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Season` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mapName` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapNumber` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MatchId` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agent` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clutchPercent` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hsPercent` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamRosterId` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_blueTeamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_redTeamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlayerStats" DROP CONSTRAINT "PlayerStats_matchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlayerStats" DROP CONSTRAINT "PlayerStats_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_seasonId_fkey";

-- DropIndex
DROP INDEX "public"."PlayerStats_playerId_matchId_key";

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "blueTeamId",
DROP COLUMN "map",
DROP COLUMN "redTeamId",
DROP COLUMN "seasonId",
ADD COLUMN     "mapName" TEXT NOT NULL,
ADD COLUMN     "mapNumber" INTEGER NOT NULL,
ADD COLUMN     "riotMatchId" TEXT,
ADD COLUMN     "seriesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."PlayerStats" DROP COLUMN "agents",
DROP COLUMN "clutchpercent",
DROP COLUMN "delta",
DROP COLUMN "hs",
DROP COLUMN "kdRatio",
DROP COLUMN "matchId",
DROP COLUMN "mkills",
DROP COLUMN "playerId",
DROP COLUMN "plusMinus",
ADD COLUMN     "MatchId" INTEGER NOT NULL,
ADD COLUMN     "agent" TEXT NOT NULL,
ADD COLUMN     "clutchPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hsPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "teamRosterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Team" DROP COLUMN "seasonId";

-- CreateTable
CREATE TABLE "public"."Series" (
    "id" SERIAL NOT NULL,
    "bestOf" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "redTeamId" INTEGER NOT NULL,
    "blueTeamId" INTEGER NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamStats" (
    "id" SERIAL NOT NULL,
    "attackWins" INTEGER NOT NULL,
    "defenseWins" INTEGER NOT NULL,
    "postPlantsWon" INTEGER NOT NULL,
    "roundsPlayed" INTEGER NOT NULL,
    "roundsWon" INTEGER NOT NULL,
    "roundsLost" INTEGER NOT NULL,
    "winPercent" DOUBLE PRECISION NOT NULL,
    "MatchId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "TeamStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Substitution" (
    "id" SERIAL NOT NULL,
    "substitutedInId" INTEGER NOT NULL,
    "substitutedOutId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "MatchId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Substitution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Round" (
    "id" SERIAL NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "winningTeam" TEXT NOT NULL,
    "site" TEXT,
    "plantTimeMs" INTEGER,
    "defuseTimeMs" INTEGER,
    "MatchId" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plant" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "site" TEXT NOT NULL,
    "playerId" INTEGER,
    "timeMs" INTEGER,
    "locationX" DOUBLE PRECISION,
    "locationY" DOUBLE PRECISION,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Defuse" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "playerId" INTEGER,
    "timeMs" INTEGER,
    "locationX" DOUBLE PRECISION,
    "locationY" DOUBLE PRECISION,

    CONSTRAINT "Defuse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoundPlayerStats" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER,
    "assists" INTEGER,
    "headshots" INTEGER NOT NULL,
    "bodyshots" INTEGER NOT NULL,
    "legshots" INTEGER NOT NULL,
    "damageDealt" INTEGER NOT NULL,
    "damageReceived" INTEGER,
    "weapon" TEXT,
    "armor" TEXT,
    "loadoutValue" INTEGER,
    "creditsRemaining" INTEGER,
    "wasAfk" BOOLEAN,
    "stayedInSpawn" BOOLEAN,

    CONSTRAINT "RoundPlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Series_seasonId_idx" ON "public"."Series"("seasonId");

-- CreateIndex
CREATE INDEX "Series_redTeamId_idx" ON "public"."Series"("redTeamId");

-- CreateIndex
CREATE INDEX "Series_blueTeamId_idx" ON "public"."Series"("blueTeamId");

-- CreateIndex
CREATE INDEX "TeamStats_MatchId_idx" ON "public"."TeamStats"("MatchId");

-- CreateIndex
CREATE INDEX "TeamStats_teamId_idx" ON "public"."TeamStats"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamStats_MatchId_teamId_key" ON "public"."TeamStats"("MatchId", "teamId");

-- CreateIndex
CREATE INDEX "Substitution_MatchId_idx" ON "public"."Substitution"("MatchId");

-- CreateIndex
CREATE INDEX "Substitution_teamId_idx" ON "public"."Substitution"("teamId");

-- CreateIndex
CREATE INDEX "Round_MatchId_idx" ON "public"."Round"("MatchId");

-- CreateIndex
CREATE INDEX "Round_winningTeam_idx" ON "public"."Round"("winningTeam");

-- CreateIndex
CREATE UNIQUE INDEX "Round_MatchId_roundNumber_key" ON "public"."Round"("MatchId", "roundNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_roundId_key" ON "public"."Plant"("roundId");

-- CreateIndex
CREATE INDEX "Plant_playerId_idx" ON "public"."Plant"("playerId");

-- CreateIndex
CREATE INDEX "Plant_site_idx" ON "public"."Plant"("site");

-- CreateIndex
CREATE UNIQUE INDEX "Defuse_roundId_key" ON "public"."Defuse"("roundId");

-- CreateIndex
CREATE INDEX "Defuse_playerId_idx" ON "public"."Defuse"("playerId");

-- CreateIndex
CREATE INDEX "RoundPlayerStats_roundId_idx" ON "public"."RoundPlayerStats"("roundId");

-- CreateIndex
CREATE INDEX "RoundPlayerStats_playerId_idx" ON "public"."RoundPlayerStats"("playerId");

-- CreateIndex
CREATE INDEX "RoundPlayerStats_teamId_idx" ON "public"."RoundPlayerStats"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "RoundPlayerStats_roundId_playerId_key" ON "public"."RoundPlayerStats"("roundId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_riotMatchId_key" ON "public"."Match"("riotMatchId");

-- CreateIndex
CREATE INDEX "Match_mapName_idx" ON "public"."Match"("mapName");

-- CreateIndex
CREATE INDEX "Match_matchDate_idx" ON "public"."Match"("matchDate");

-- CreateIndex
CREATE UNIQUE INDEX "Match_seriesId_mapNumber_key" ON "public"."Match"("seriesId", "mapNumber");

-- CreateIndex
CREATE INDEX "Player_name_tag_idx" ON "public"."Player"("name", "tag");

-- CreateIndex
CREATE INDEX "PlayerStats_MatchId_idx" ON "public"."PlayerStats"("MatchId");

-- CreateIndex
CREATE INDEX "PlayerStats_teamRosterId_idx" ON "public"."PlayerStats"("teamRosterId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_teamRosterId_MatchId_key" ON "public"."PlayerStats"("teamRosterId", "MatchId");

-- CreateIndex
CREATE INDEX "Season_startDate_idx" ON "public"."Season"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "public"."Season"("name");

-- CreateIndex
CREATE INDEX "Team_name_idx" ON "public"."Team"("name");

-- CreateIndex
CREATE INDEX "TeamRoster_teamId_idx" ON "public"."TeamRoster"("teamId");

-- CreateIndex
CREATE INDEX "TeamRoster_playerId_idx" ON "public"."TeamRoster"("playerId");

-- CreateIndex
CREATE INDEX "TeamRoster_seasonId_idx" ON "public"."TeamRoster"("seasonId");

-- AddForeignKey
ALTER TABLE "public"."Series" ADD CONSTRAINT "Series_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Series" ADD CONSTRAINT "Series_redTeamId_fkey" FOREIGN KEY ("redTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Series" ADD CONSTRAINT "Series_blueTeamId_fkey" FOREIGN KEY ("blueTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "public"."Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerStats" ADD CONSTRAINT "PlayerStats_MatchId_fkey" FOREIGN KEY ("MatchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerStats" ADD CONSTRAINT "PlayerStats_teamRosterId_fkey" FOREIGN KEY ("teamRosterId") REFERENCES "public"."TeamRoster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamStats" ADD CONSTRAINT "TeamStats_MatchId_fkey" FOREIGN KEY ("MatchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamStats" ADD CONSTRAINT "TeamStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Substitution" ADD CONSTRAINT "Substitution_substitutedInId_fkey" FOREIGN KEY ("substitutedInId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Substitution" ADD CONSTRAINT "Substitution_substitutedOutId_fkey" FOREIGN KEY ("substitutedOutId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Substitution" ADD CONSTRAINT "Substitution_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Substitution" ADD CONSTRAINT "Substitution_MatchId_fkey" FOREIGN KEY ("MatchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Round" ADD CONSTRAINT "Round_MatchId_fkey" FOREIGN KEY ("MatchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plant" ADD CONSTRAINT "Plant_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "public"."Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plant" ADD CONSTRAINT "Plant_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Defuse" ADD CONSTRAINT "Defuse_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "public"."Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Defuse" ADD CONSTRAINT "Defuse_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoundPlayerStats" ADD CONSTRAINT "RoundPlayerStats_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "public"."Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoundPlayerStats" ADD CONSTRAINT "RoundPlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoundPlayerStats" ADD CONSTRAINT "RoundPlayerStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

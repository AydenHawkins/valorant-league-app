/*
  Warnings:

  - You are about to drop the column `riotMatchId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `MatchId` on the `PlayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `MatchId` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `MatchId` on the `Substitution` table. All the data in the column will be lost.
  - You are about to drop the column `MatchId` on the `TeamStats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[riotmatchId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamRosterId,matchId]` on the table `PlayerStats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchId,roundNumber]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchId,teamId]` on the table `TeamStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchId` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchId` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchId` to the `Substitution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchId` to the `TeamStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PlayerStats" DROP CONSTRAINT "PlayerStats_MatchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Round" DROP CONSTRAINT "Round_MatchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Substitution" DROP CONSTRAINT "Substitution_MatchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TeamStats" DROP CONSTRAINT "TeamStats_MatchId_fkey";

-- DropIndex
DROP INDEX "public"."Match_riotMatchId_key";

-- DropIndex
DROP INDEX "public"."PlayerStats_MatchId_idx";

-- DropIndex
DROP INDEX "public"."PlayerStats_teamRosterId_MatchId_key";

-- DropIndex
DROP INDEX "public"."Round_MatchId_idx";

-- DropIndex
DROP INDEX "public"."Round_MatchId_roundNumber_key";

-- DropIndex
DROP INDEX "public"."Substitution_MatchId_idx";

-- DropIndex
DROP INDEX "public"."TeamStats_MatchId_idx";

-- DropIndex
DROP INDEX "public"."TeamStats_MatchId_teamId_key";

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "riotMatchId",
ADD COLUMN     "riotmatchId" TEXT;

-- AlterTable
ALTER TABLE "public"."PlayerStats" DROP COLUMN "MatchId",
ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Round" DROP COLUMN "MatchId",
ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Substitution" DROP COLUMN "MatchId",
ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."TeamStats" DROP COLUMN "MatchId",
ADD COLUMN     "matchId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Match_riotmatchId_key" ON "public"."Match"("riotmatchId");

-- CreateIndex
CREATE INDEX "PlayerStats_matchId_idx" ON "public"."PlayerStats"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_teamRosterId_matchId_key" ON "public"."PlayerStats"("teamRosterId", "matchId");

-- CreateIndex
CREATE INDEX "Round_matchId_idx" ON "public"."Round"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_matchId_roundNumber_key" ON "public"."Round"("matchId", "roundNumber");

-- CreateIndex
CREATE INDEX "Substitution_matchId_idx" ON "public"."Substitution"("matchId");

-- CreateIndex
CREATE INDEX "TeamStats_matchId_idx" ON "public"."TeamStats"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamStats_matchId_teamId_key" ON "public"."TeamStats"("matchId", "teamId");

-- AddForeignKey
ALTER TABLE "public"."PlayerStats" ADD CONSTRAINT "PlayerStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamStats" ADD CONSTRAINT "TeamStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Substitution" ADD CONSTRAINT "Substitution_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Round" ADD CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "public"."Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

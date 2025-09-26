/*
  Warnings:

  - You are about to drop the column `awayTeamId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `riotId` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[puuid]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tag]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blueTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_homeTeamId_fkey";

-- DropIndex
DROP INDEX "public"."Player_discordId_key";

-- DropIndex
DROP INDEX "public"."Player_riotId_key";

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "awayTeamId",
DROP COLUMN "homeTeamId",
ADD COLUMN     "blueTeamId" INTEGER NOT NULL,
ADD COLUMN     "redTeamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "discordId",
DROP COLUMN "riotId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "puuid" TEXT,
ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_puuid_key" ON "public"."Player"("puuid");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_tag_key" ON "public"."Player"("name", "tag");

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_redTeamId_fkey" FOREIGN KEY ("redTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_blueTeamId_fkey" FOREIGN KEY ("blueTeamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

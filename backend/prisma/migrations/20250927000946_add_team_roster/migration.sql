/*
  Warnings:

  - You are about to drop the column `teamId` on the `Player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Player" DROP CONSTRAINT "Player_teamId_fkey";

-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "teamId";

-- CreateTable
CREATE TABLE "public"."TeamRoster" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "teamId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_playerId_teamId_seasonId_key" ON "public"."TeamRoster"("playerId", "teamId", "seasonId");

-- AddForeignKey
ALTER TABLE "public"."TeamRoster" ADD CONSTRAINT "TeamRoster_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamRoster" ADD CONSTRAINT "TeamRoster_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamRoster" ADD CONSTRAINT "TeamRoster_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

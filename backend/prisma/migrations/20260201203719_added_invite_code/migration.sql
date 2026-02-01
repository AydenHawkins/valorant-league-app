/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "inviteCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Player_inviteCode_key" ON "Player"("inviteCode");

-- CreateIndex
CREATE INDEX "Player_inviteCode_idx" ON "Player"("inviteCode");

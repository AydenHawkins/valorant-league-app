/*
  Warnings:

  - You are about to drop the column `ceremony` on the `Round` table. All the data in the column will be lost.
  - Made the column `mapId` on table `Match` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_mapId_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "mapId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "ceremony";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

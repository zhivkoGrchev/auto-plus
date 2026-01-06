/*
  Warnings:

  - You are about to drop the column `imageHash` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "imageHash",
DROP COLUMN "imageUrl";

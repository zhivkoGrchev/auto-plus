/*
  Warnings:

  - Made the column `cubicCapacity` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "imageHash" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "cubicCapacity" SET NOT NULL;

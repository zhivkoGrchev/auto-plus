/*
  Warnings:

  - Added the required column `powerKW` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powerPS` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "powerKW" INTEGER NOT NULL,
ADD COLUMN     "powerPS" INTEGER NOT NULL;

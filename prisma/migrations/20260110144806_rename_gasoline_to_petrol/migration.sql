/*
  Warnings:

  - The values [gasoline] on the enum `FuelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FuelType_new" AS ENUM ('diesel', 'petrol', 'gas', 'electric', 'hybrid');
ALTER TABLE "Car" ALTER COLUMN "fuelType" TYPE "FuelType_new" USING ("fuelType"::text::"FuelType_new");
ALTER TYPE "FuelType" RENAME TO "FuelType_old";
ALTER TYPE "FuelType_new" RENAME TO "FuelType";
DROP TYPE "public"."FuelType_old";
COMMIT;

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('convertible', 'compact', 'sedan', 'van', 'suv', 'stationWagon', 'coupe', 'other');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "mot" TIMESTAMP(3),
ADD COLUMN     "vehicleType" "VehicleType";

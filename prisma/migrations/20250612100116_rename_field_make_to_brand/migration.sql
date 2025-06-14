/*
  Warnings:

  - You are about to drop the column `makeId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `makeId` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the `CarMake` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brandId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `CarModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_makeId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_makeId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "makeId",
ADD COLUMN     "brandId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "CarModel" DROP COLUMN "makeId",
ADD COLUMN     "brandId" UUID NOT NULL;

-- DropTable
DROP TABLE "CarMake";

-- CreateTable
CREATE TABLE "CarBrand" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarBrand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "CarBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "CarBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

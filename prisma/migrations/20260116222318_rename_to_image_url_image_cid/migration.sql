/*
  Warnings:

  - You are about to drop the column `imageHash` on the `car_image` table. All the data in the column will be lost.
  - You are about to drop the column `logoHash` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `profile` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_image" DROP COLUMN "imageHash",
ADD COLUMN     "imageCid" TEXT;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "logoHash",
DROP COLUMN "logoUrl",
ADD COLUMN     "imageCid" TEXT,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

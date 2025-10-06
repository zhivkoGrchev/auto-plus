/*
  Warnings:

  - You are about to drop the column `organization` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "profileId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."profile" DROP COLUMN "organization",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_slug_key" ON "public"."profile"("slug");

-- AddForeignKey
ALTER TABLE "public"."Car" ADD CONSTRAINT "Car_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

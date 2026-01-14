/*
  Warnings:

  - You are about to drop the column `isDefault` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "isDefault",
ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "logo",
ADD COLUMN     "logoHash" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- CreateIndex
CREATE INDEX "profile_slug_idx" ON "profile"("slug");

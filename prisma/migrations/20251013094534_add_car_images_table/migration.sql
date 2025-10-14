-- CreateTable
CREATE TABLE "public"."car_image" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "carId" UUID NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageHash" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "car_image_carId_idx" ON "public"."car_image"("carId");

-- AddForeignKey
ALTER TABLE "public"."car_image" ADD CONSTRAINT "car_image_carId_fkey" FOREIGN KEY ("carId") REFERENCES "public"."Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

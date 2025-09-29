-- CreateTable
CREATE TABLE "public"."opening_hours" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "monday" JSONB,
    "tuesday" JSONB,
    "wednesday" JSONB,
    "thursday" JSONB,
    "friday" JSONB,
    "saturday" JSONB,
    "sunday" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opening_hours_pkey" PRIMARY KEY ("id")
);

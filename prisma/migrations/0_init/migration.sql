-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "user_role_type" AS ENUM ('super_admin', 'admin', 'moderator', 'user');

-- CreateTable
CREATE TABLE "bookings" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "travel_dates" JSONB NOT NULL,
    "guests" INTEGER NOT NULL,
    "guests_children" INTEGER,
    "rooms" TEXT[],
    "message" TEXT,
    "is_canceled" BOOLEAN DEFAULT false,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "user_color" VARCHAR(255) NOT NULL,
    "user_role" "user_role_type" DEFAULT 'user',
    "given_name" VARCHAR(255),
    "family_name" VARCHAR(255),
    "family_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");


/*
  Warnings:

  - You are about to drop the column `is_test_booking` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "is_test_booking";

-- CreateTable
CREATE TABLE "DevBooking" (
    "id" TEXT NOT NULL,
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT NOT NULL,
    "user_id" TEXT NOT NULL,
    "booking_name" TEXT,
    "name" TEXT NOT NULL,
    "arrival" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departure" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guests" INTEGER NOT NULL,
    "guests_children" INTEGER,
    "rooms" TEXT[],
    "message" TEXT,
    "is_canceled" BOOLEAN DEFAULT false,
    "is_rented_out" BOOLEAN DEFAULT false,

    CONSTRAINT "DevBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DevBooking" ADD CONSTRAINT "DevBooking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

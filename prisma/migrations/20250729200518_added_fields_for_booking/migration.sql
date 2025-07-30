-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "is_rented_out" BOOLEAN DEFAULT false,
ADD COLUMN     "is_test_booking" BOOLEAN DEFAULT false;

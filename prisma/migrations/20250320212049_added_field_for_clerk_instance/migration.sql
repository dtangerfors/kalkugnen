-- CreateEnum
CREATE TYPE "clerk_instance" AS ENUM ('development', 'production');

-- AlterTable
ALTER TABLE "AppUser" ADD COLUMN     "instance" "clerk_instance" DEFAULT 'production';

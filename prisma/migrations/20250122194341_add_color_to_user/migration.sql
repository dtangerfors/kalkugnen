/*
  Warnings:

  - Added the required column `user_color` to the `AppUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppUser" ADD COLUMN     "user_color" TEXT NOT NULL;

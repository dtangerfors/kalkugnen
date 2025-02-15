/*
  Warnings:

  - The primary key for the `PushSubscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PushSubscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PushSubscription" DROP CONSTRAINT "PushSubscription_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("device_id");

/*
  Warnings:

  - You are about to drop the column `is_Admin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_Admin",
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;

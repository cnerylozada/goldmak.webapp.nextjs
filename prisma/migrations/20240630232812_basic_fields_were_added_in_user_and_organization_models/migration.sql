/*
  Warnings:

  - Added the required column `name` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

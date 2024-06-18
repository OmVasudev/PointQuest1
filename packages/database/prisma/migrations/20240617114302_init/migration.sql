/*
  Warnings:

  - Added the required column `clubName` to the `BOD` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BOD" ADD COLUMN     "clubName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "passingYear" SET DATA TYPE TEXT;

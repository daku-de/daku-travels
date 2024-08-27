/*
  Warnings:

  - Added the required column `continent` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "continent" TEXT NOT NULL;

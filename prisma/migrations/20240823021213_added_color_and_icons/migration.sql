/*
  Warnings:

  - Added the required column `color` to the `ResidencePeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `ResidencePeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResidencePeriod" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;

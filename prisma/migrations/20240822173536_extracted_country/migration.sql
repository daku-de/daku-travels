/*
  Warnings:

  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `ResidencePeriod` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Travel` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `ResidencePeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "country",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResidencePeriod" DROP COLUMN "country",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "destination",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "zoomFactor" DOUBLE PRECISION NOT NULL,
    "label_x" DOUBLE PRECISION NOT NULL,
    "label_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidencePeriod" ADD CONSTRAINT "ResidencePeriod_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

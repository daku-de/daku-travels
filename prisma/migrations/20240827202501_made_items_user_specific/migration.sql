/*
  Warnings:

  - Added the required column `userId` to the `ResidencePeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResidencePeriod" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResidencePeriod" ADD CONSTRAINT "ResidencePeriod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

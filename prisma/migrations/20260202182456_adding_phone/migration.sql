/*
  Warnings:

  - Changed the type of `phone` on the `feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "feedback_phone_key" ON "feedback"("phone");

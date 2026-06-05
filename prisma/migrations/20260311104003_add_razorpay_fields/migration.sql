/*
  Warnings:

  - You are about to drop the column `phonepe_transaction_id` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[razorpay_order_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "feedback_phone_key";

-- DropIndex
DROP INDEX "payments_phonepe_transaction_id_key";

-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "delivery_status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "phonepe_transaction_id",
ADD COLUMN     "razorpay_order_id" TEXT,
ADD COLUMN     "razorpay_payment_id" TEXT,
ADD COLUMN     "razorpay_signature" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpay_order_id_key" ON "payments"("razorpay_order_id");

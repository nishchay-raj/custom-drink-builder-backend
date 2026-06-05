/*
  Warnings:

  - You are about to drop the column `menu_item_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `merchant_transaction_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the `admin_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[transaction_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `base_drink_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menu_items" DROP CONSTRAINT "menu_items_category_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_menu_item_id_fkey";

-- DropIndex
DROP INDEX "payments_merchant_transaction_id_key";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "menu_item_id",
DROP COLUMN "price",
ADD COLUMN     "base_drink_id" TEXT NOT NULL,
ADD COLUMN     "base_price" INTEGER NOT NULL,
ADD COLUMN     "total_amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "delivery_status",
DROP COLUMN "email",
DROP COLUMN "number",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "merchant_transaction_id",
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "transaction_id" TEXT;

-- DropTable
DROP TABLE "admin_user";

-- DropTable
DROP TABLE "feedback";

-- DropTable
DROP TABLE "menu_categories";

-- DropTable
DROP TABLE "menu_items";

-- CreateTable
CREATE TABLE "base_drinks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "base_drinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flavors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "flavors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_drink_flavors" (
    "base_drink_id" TEXT NOT NULL,
    "flavor_id" TEXT NOT NULL,

    CONSTRAINT "base_drink_flavors_pkey" PRIMARY KEY ("base_drink_id","flavor_id")
);

-- CreateTable
CREATE TABLE "order_item_options" (
    "id" TEXT NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "flavor_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "order_item_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_drinks_name_key" ON "base_drinks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "flavors_name_key" ON "flavors"("name");

-- CreateIndex
CREATE INDEX "base_drink_flavors_base_drink_id_idx" ON "base_drink_flavors"("base_drink_id");

-- CreateIndex
CREATE INDEX "base_drink_flavors_flavor_id_idx" ON "base_drink_flavors"("flavor_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_item_options_order_item_id_flavor_id_key" ON "order_item_options"("order_item_id", "flavor_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "order_items_base_drink_id_idx" ON "order_items"("base_drink_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "payments"("transaction_id");

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- AddForeignKey
ALTER TABLE "base_drink_flavors" ADD CONSTRAINT "base_drink_flavors_base_drink_id_fkey" FOREIGN KEY ("base_drink_id") REFERENCES "base_drinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_drink_flavors" ADD CONSTRAINT "base_drink_flavors_flavor_id_fkey" FOREIGN KEY ("flavor_id") REFERENCES "flavors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_base_drink_id_fkey" FOREIGN KEY ("base_drink_id") REFERENCES "base_drinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_options" ADD CONSTRAINT "order_item_options_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_options" ADD CONSTRAINT "order_item_options_flavor_id_fkey" FOREIGN KEY ("flavor_id") REFERENCES "flavors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

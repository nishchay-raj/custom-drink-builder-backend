/*
  Warnings:

  - Added the required column `email` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;

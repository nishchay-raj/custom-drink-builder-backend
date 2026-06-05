-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_base_drink_id_fkey";

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "addon_id" TEXT,
ALTER COLUMN "base_drink_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "table_number" INTEGER;

-- CreateTable
CREATE TABLE "addons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" TEXT NOT NULL,
    "table_number" INTEGER NOT NULL,
    "is_occupied" BOOLEAN NOT NULL DEFAULT false,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addons_name_key" ON "addons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tables_table_number_key" ON "tables"("table_number");

-- CreateIndex
CREATE INDEX "order_item_options_order_item_id_idx" ON "order_item_options"("order_item_id");

-- CreateIndex
CREATE INDEX "order_item_options_flavor_id_idx" ON "order_item_options"("flavor_id");

-- CreateIndex
CREATE INDEX "order_items_addon_id_idx" ON "order_items"("addon_id");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_base_drink_id_fkey" FOREIGN KEY ("base_drink_id") REFERENCES "base_drinks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_addon_id_fkey" FOREIGN KEY ("addon_id") REFERENCES "addons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

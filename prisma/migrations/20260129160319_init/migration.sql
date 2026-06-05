-- CreateTable
CREATE TABLE "menu_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_successful" BOOLEAN NOT NULL DEFAULT false,
    "delivery_status" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "menu_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "merchant_transaction_id" TEXT NOT NULL,
    "phonepe_transaction_id" TEXT,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "raw_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_categories_name_key" ON "menu_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_name_key" ON "menu_items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "payments_merchant_transaction_id_key" ON "payments"("merchant_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_phonepe_transaction_id_key" ON "payments"("phonepe_transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_email_key" ON "admin_user"("email");

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "menu_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

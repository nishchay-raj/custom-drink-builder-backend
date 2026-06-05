-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'KITCHEN', 'WAITER');

-- CreateTable
CREATE TABLE "logins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logins_email_key" ON "logins"("email");

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedback_phone_key" ON "feedback"("phone");

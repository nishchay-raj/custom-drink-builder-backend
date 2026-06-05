-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

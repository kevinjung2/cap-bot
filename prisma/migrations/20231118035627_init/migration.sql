-- CreateTable
CREATE TABLE "Cap" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,

    CONSTRAINT "Cap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cap_userId_key" ON "Cap"("userId");

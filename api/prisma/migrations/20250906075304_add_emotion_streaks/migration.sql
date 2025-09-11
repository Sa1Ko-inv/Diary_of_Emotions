-- CreateTable
CREATE TABLE "emotion_streaks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emotionGroupId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emotion_streaks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emotion_streaks_userId_emotionGroupId_key" ON "emotion_streaks"("userId", "emotionGroupId");

-- AddForeignKey
ALTER TABLE "emotion_streaks" ADD CONSTRAINT "emotion_streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emotion_streaks" ADD CONSTRAINT "emotion_streaks_emotionGroupId_fkey" FOREIGN KEY ("emotionGroupId") REFERENCES "emotion_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

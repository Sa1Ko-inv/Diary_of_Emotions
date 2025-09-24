-- DropForeignKey
ALTER TABLE "emotion_streaks" DROP CONSTRAINT "emotion_streaks_userId_fkey";

-- AddForeignKey
ALTER TABLE "emotion_streaks" ADD CONSTRAINT "emotion_streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

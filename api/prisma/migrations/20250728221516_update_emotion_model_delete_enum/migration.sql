/*
  Warnings:

  - You are about to drop the column `emotion` on the `entry_emotions` table. All the data in the column will be lost.
  - Added the required column `emotionId` to the `entry_emotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entry_emotions" DROP COLUMN "emotion",
ADD COLUMN     "emotionId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Emotion";

-- CreateTable
CREATE TABLE "EmotionGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "EmotionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmotionType" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EmotionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entry_emotions" ADD CONSTRAINT "entry_emotions_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "EmotionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmotionType" ADD CONSTRAINT "EmotionType_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "EmotionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

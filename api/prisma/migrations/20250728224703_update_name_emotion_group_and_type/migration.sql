/*
  Warnings:

  - You are about to drop the `EmotionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmotionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmotionType" DROP CONSTRAINT "EmotionType_groupId_fkey";

-- DropForeignKey
ALTER TABLE "entry_emotions" DROP CONSTRAINT "entry_emotions_emotionId_fkey";

-- DropTable
DROP TABLE "EmotionGroup";

-- DropTable
DROP TABLE "EmotionType";

-- CreateTable
CREATE TABLE "emotion_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,

    CONSTRAINT "emotion_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emotion_types" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "emotion_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entry_emotions" ADD CONSTRAINT "entry_emotions_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "emotion_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emotion_types" ADD CONSTRAINT "emotion_types_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "emotion_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

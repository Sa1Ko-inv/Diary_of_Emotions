-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_userId_fkey";

-- DropForeignKey
ALTER TABLE "entry_emotions" DROP CONSTRAINT "entry_emotions_entryId_fkey";

-- DropForeignKey
ALTER TABLE "entry_triggers" DROP CONSTRAINT "entry_triggers_entryId_fkey";

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_emotions" ADD CONSTRAINT "entry_emotions_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_triggers" ADD CONSTRAINT "entry_triggers_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { PrismaClient } from '@prisma/client';
import { seedEmotion } from './seeders/emotions';
import { seedTrigger } from './seeders/trigger';

const prisma = new PrismaClient();

async function main() {
  await seedEmotion(prisma);
  await seedTrigger(prisma);
}

main()
  .then(() => {
    console.log('Сид завршен.');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Ошибка сидирования', e);
    await prisma.$disconnect();
    process.exit(1);
  });

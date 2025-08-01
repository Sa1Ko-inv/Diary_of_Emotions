import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry, EntryEmotion } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EntryService {
  constructor(private readonly prismaService: PrismaService) {}

  // TODO разобраться как работает создание записи
  async create(userId: string, dto: CreateEntryDto): Promise<Entry> {
    const { date, description, emotions, triggers } = dto;

    const entry = await this.prismaService.entry.create({
      data: {
        userId,
        date: date ? new Date(date) : new Date(),
        description,
        emotions: {
          create: emotions.map((emotion) => ({
            emotion: {
              connect: { id: emotion.emotionTypeId },
            },
            intensity: emotion.intensity,
          })),
        },
        triggers: {
          create: await Promise.all(
            triggers.map(async (label) => {
              // Нормализуем label, приводя к нижнему регистру
              const normalizedLabel = label.trim().toLowerCase();

              // Ищем существующий триггер с нормализованным label
              const existing = await this.prismaService.trigger.findFirst({
                where: {
                  label: { equals: normalizedLabel, mode: 'insensitive' }, // Регистронезависимый поиск
                  OR: [{ createdBy: null }, { createdBy: userId }],
                },
              });

              // Если триггер не существует, создаем с оригинальным label
              const trigger =
                existing ??
                (await this.prismaService.trigger.create({
                  data: {
                    label: label, // Сохраняем оригинальный label для отображения
                    createdBy: userId,
                  },
                }));

              return {
                trigger: {
                  connect: { id: trigger.id },
                },
              };
            })
          ),
        },
      },
      include: {
        emotions: {
          include: {
            emotion: {
              include: {
                group: true,
              },
            },
          },
        },
        triggers: {
          include: {
            trigger: true,
          },
        },
      },
    });
    return entry;
  }

  findAll() {
    const entries = this.prismaService.entry.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        emotions: {
          include: {
            emotion: {
              include: {
                group: true,
              },
            },
          },
        },
        triggers: {
          include: {
            trigger: true,
          },
        },
      },
    });

    return entries;
  }

  // TODO доделать, update, remove
  async findOne(id: string): Promise<Entry> {
    const entry = await this.prismaService.entry.findUnique({
      where: { id },
      include: {
        emotions: {
          include: {
            emotion: {
              include: {
                group: true,
              },
            },
          },
        },
        triggers: {
          include: {
            trigger: {
              select: {
                id: true,
                label: true,
                createdBy: true,
              },
            },
          },
        },
      },
    });
    if (!entry) {
      throw new NotFoundException(`Заметка с таким ${id} не найдена`);
    }

    return entry;
  }

  async update(id: string, dto: UpdateEntryDto): Promise<Entry> {
    // Проверяем, существует ли запись
    const entry = await this.findOne(id);

    const { date, description, emotions, triggers } = dto;

    // Подготавливаем данные для обновления
    const updateData: any = {
      ...(date && { date: new Date(date) }),
      ...(description !== undefined && { description }),
    };

    // Подготавливаем данные для эмоций
    const emotionsData = emotions
      ? {
          // Удаляем старые связи с эмоциями
          deleteMany: { entryId: id },
          // Создаем новые связи
          create: emotions.map((emotion) => ({
            emotion: {
              connect: { id: emotion.emotionTypeId },
            },
            intensity: emotion.intensity,
          })),
        }
      : {};

    // Подготавливаем данные для триггеров
    const triggersData = triggers
      ? {
          // Удаляем старые связи с триггерами
          deleteMany: { entryId: id },
          // Создаем новые связи
          create: await Promise.all(
            triggers.map(async (label) => {
              // Нормализуем label, приводя к нижнему регистру
              const normalizedLabel = label.trim().toLowerCase();

              // Ищем существующий триггер
              const existing = await this.prismaService.trigger.findFirst({
                where: {
                  label: { equals: normalizedLabel, mode: 'insensitive' },
                  OR: [{ createdBy: null }, { createdBy: entry.userId }],
                },
              });

              // Если триггер не существует, создаем новый
              const trigger =
                existing ??
                (await this.prismaService.trigger.create({
                  data: {
                    label, // Сохраняем оригинальный label
                    createdBy: entry.userId,
                  },
                }));

              return {
                trigger: {
                  connect: { id: trigger.id },
                },
              };
            })
          ),
        }
      : {};

    // Выполняем обновление записи
    const updatedEntry = await this.prismaService.entry.update({
      where: { id },
      data: {
        ...updateData,
        emotions: emotionsData,
        triggers: triggersData,
      },
      include: {
        emotions: {
          include: {
            emotion: {
              include: {
                group: true,
              },
            },
          },
        },
        triggers: {
          include: {
            trigger: true,
          },
        },
      },
    });

    return updatedEntry;
  }

  // TODO: разобраться с каскадным удалением
  async remove(id: string) {
    const entry = await this.findOne(id);

    await this.prismaService.entry.delete({
      where: { id: entry.id },
    });
    return { message: `Запись с ID ${id} успешно удалена` };
  }
}

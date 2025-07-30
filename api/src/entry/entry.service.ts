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
              const trigger = existing ?? await this.prismaService.trigger.create({
                data: {
                  label: label, // Сохраняем оригинальный label для отображения
                  createdBy: userId,
                },
              });

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
    return `This action returns all entry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entry`;
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}

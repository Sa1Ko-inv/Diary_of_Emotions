import {
   ConflictException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { Trigger } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTriggerDto } from './dto/create-trigger.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';

@Injectable()
export class TriggerService {
   constructor(private readonly prismaService: PrismaService) {}

   private capitalizeFirstLetter(string: string): string {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   async create(createdBy: string, dto: CreateTriggerDto): Promise<Trigger> {
      const { label } = dto;

      // Нормализуем label, приводя к нижнему регистру
      const normalizedLabel = label.trim().toLowerCase();

      // Проверяем, существует ли уже триггер с таким label
      const existingTrigger = await this.prismaService.trigger.findFirst({
         where: {
            label: { equals: normalizedLabel, mode: 'insensitive' }, // Регистронезависимый поиск
            OR: [{ createdBy: null }, { createdBy }],
         },
      });

      if (existingTrigger) {
         throw new ConflictException(
            `Триггер с таким label '${label}' уже существует: ${existingTrigger.label}`
         );
      }

      const formattedLabel = this.capitalizeFirstLetter(label.trim());

      // Если триггер не существует, создаем новый
      return this.prismaService.trigger.create({
         data: {
            label: formattedLabel,
            createdBy,
         },
      });
   }

   async findAll() {
      const triggers = await this.prismaService.trigger.findMany({
         orderBy: {
            label: 'asc',
         },
         select: {
            id: true,
            label: true,
            createdBy: true,
         },
      });

      return triggers;
   }

   async findOne(id: string) {
      const trigger = await this.prismaService.trigger.findUnique({
         where: { id },
         select: {
            id: true,
            label: true,
            createdBy: true,
         },
      });
      if (!trigger) {
         throw new NotFoundException(`Триггер с ID ${id} не найден`);
      }
      return trigger;
   }

   async findCreatedByUser() {
      try {
         return await this.prismaService.trigger.findMany({
            where: { createdBy: { not: null } },
            orderBy: { createdBy: 'asc' },
            select: { id: true, label: true, createdBy: true },
         });
      } catch (error) {
         throw new InternalServerErrorException('Ошибка при получении триггеров');
      }
   }

   async update(id: string, dto: UpdateTriggerDto): Promise<Trigger> {
      const trigger = await this.findOne(id);

      // Проверяем, является ли триггер системным (createdBy: null)
      if (trigger.createdBy === null) {
         throw new ConflictException('Нельзя изменить системный триггер');
      }

      const formattedLabel = dto.label
         ? this.capitalizeFirstLetter(dto.label.trim())
         : trigger.label;

      const updatedTrigger = await this.prismaService.trigger.update({
         where: { id: trigger.id, createdBy: { not: null } },
         data: {
            label: formattedLabel,
            createdBy: dto.createdBy || trigger.createdBy,
         },
         select: {
            id: true,
            label: true,
            createdBy: true,
         },
      });

      if (!updatedTrigger) {
         throw new NotFoundException(`Триггер с ID ${id} не найден`);
      }

      return updatedTrigger;
   }

   async remove(id: string) {
      const trigger = await this.findOne(id);

      // Проверяем, является ли триггер системным (createdBy: null)
      if (trigger.createdBy === null) {
         throw new ConflictException('Нельзя удалить системный триггер');
      }

      await this.prismaService.trigger.delete({
         where: { id: trigger.id, createdBy: { not: null } },
      });

      return { message: `Триггер: '${trigger.label}' успешно удален` };
   }
}

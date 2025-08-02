import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName, birthDate } = dto;

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id, // Используем argon2id для лучшей безопасности
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3, // Количество итераций
      parallelism: 1, // Параллельность
    });

    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException(`Пользователь с email ${email} уже существует`);
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        birthDate, // Ensure the date is stored correctly
      },
    });
    return user;
  }

  async findAll() {
    const user = await this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        createdAt: true,
      },
    });
    return plainToInstance(UserResponseDto, user);
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        birthDate: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return plainToInstance(UserResponseDto, user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const password = dto.password
      ? await argon2.hash(dto.password, {
          type: argon2.argon2id,
          memoryCost: 2 ** 16, // 64 MB
          timeCost: 3, // Количество итераций
          parallelism: 1, // Параллельность
        })
      : user.password;

    const currentBirthDate =
      typeof user.birthDate === 'string'
        ? new Date(user.birthDate.split('/').reverse().join('-'))
        : user.birthDate;

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email: dto.email ?? user.email,
        password,
        firstName: dto.firstName ?? user.firstName,
        lastName: dto.lastName ?? user.lastName,
        birthDate: dto.birthDate ?? currentBirthDate,
      },
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.prismaService.user.delete({
      where: { id: user.id },
    });

    return { message: `Пользователь с ID ${id} успешно удален` };
  }
}

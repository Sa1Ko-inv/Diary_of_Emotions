import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName, birthDate } = dto;

    const user = await this.prismaService.user.create({
      data: {
        email,
        password,
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
        // password: true,
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

    const userUpdate = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email: dto.email || user.email,
        password: dto.password || user.password,
        firstName: dto.firstName || user.firstName,
        lastName: dto.lastName || user.lastName,
        birthDate: dto.birthDate || user.birthDate, // Ensure the date is stored correctly
      },
    });

    return userUpdate;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.prismaService.user.delete({
      where: { id: user.id },
    });

    return { message: `Пользователь с ID ${id} успешно удален` };
  }
}

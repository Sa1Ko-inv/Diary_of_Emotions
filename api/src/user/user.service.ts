import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`Пользователь с ID ${id} не найден`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

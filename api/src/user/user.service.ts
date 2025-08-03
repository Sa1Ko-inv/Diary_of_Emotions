import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';
import * as argon2 from 'argon2';
import { JwtPayload } from './interdaces/jwt.interfaces';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './dto/login.dto';
import { verify } from 'argon2';

@Injectable()
export class UserService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
  }

  async register(dto: RegisterDto) {
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
      throw new ConflictException(`Пользователь с email '${email}' уже существует`);
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

    const tokens = this.generateTokens(user.id);

    return {user, tokens}
  }

  async login (dto: LoginRequest) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      }
    })

    if (!user) {
      throw new NotFoundException(`Пользователь не найден`);
    }

    const isValidPassword = await verify(user.password, password)

    if( !isValidPassword) {
      throw new NotFoundException('Пользователь не найден')
    }

    return this.generateTokens(user.id)
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken:string = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken:string = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
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
      typeof user.birthDate === 'string' ? new Date(user.birthDate.split('/').reverse().join('-')) : user.birthDate;

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

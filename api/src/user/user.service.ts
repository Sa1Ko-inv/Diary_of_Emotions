import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthMethod, User } from '@prisma/client';
import { hash } from 'argon2';
import { plainToInstance } from 'class-transformer';

import { PrismaService } from '../prisma/prisma.service';

import { UserResponseDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
   public constructor(private readonly prismaService: PrismaService) {}

   public async findById(id: string) {
      const user = await this.prismaService.user.findUnique({
         where: { id },
         include: {
            accounts: true,
         },
      });

      if (!user) {
         throw new NotFoundException(
            'Пользователь не найден. Пожалуйста, проверьте введенные данные.'
         );
      }

      return user;
   }

   public async findByEmail(email: string) {
      const user = await this.prismaService.user.findUnique({
         where: { email },
         include: {
            accounts: true,
         },
      });

      return user;
   }

   // Будет вызываться два раза: создание пользователя при регистрации через поля и при регистрации через соцсеть
   public async create(
      email: string,
      password: string,
      displayName: string,
      picture: string,
      method: AuthMethod,
      isVerified: boolean
   ) {
      const user = await this.prismaService.user.create({
         data: {
            email,
            password: password ? await hash(password) : '',
            displayName,
            picture,
            method,
            isVerified,
         },
         include: {
            accounts: true,
         },
      });
      return user;
   }

   // TODO: Сделать защиту от изменения email на уже существующий, а также загрузку картинки
   public async update(userId: string, dto: UpdateUserDto) {
      const user = await this.findById(userId)

      const password = dto.password
         ? await hash(dto.password, {
            memoryCost: 2 ** 16, // 64 MB
            timeCost: 3, // Количество итераций
            parallelism: 1, // Параллельность
         })
         : user.password;

      const updatedUser = await this.prismaService.user.update({

         where: {
            id: user.id
         },
         data: {
            email: dto.email ?? user.email,
            displayName: dto.name ?? user.displayName,
            isTwoFactorEnabled: dto.isTwoFactorEnabled ?? user.isTwoFactorEnabled,
            picture: dto.picture ?? user.picture,
            password: password
         }
      })

      return updatedUser;
   }

   //
   // async findAll() {
   //    const user = await this.prismaService.user.findMany({
   //       orderBy: {
   //          createdAt: 'desc',
   //       },
   //       select: {
   //          id: true,
   //          email: true,
   //          displayName: true,
   //          picture: true,
   //          method: true,
   //          isVerified: true,
   //          createdAt: true,
   //       },
   //    });
   //    return plainToInstance(UserResponseDto, user);
   // }
   //
   // async findOne(id: string) {
   //    const user = await this.prismaService.user.findUnique({
   //       where: { id },
   //       select: {
   //          id: true,
   //          email: true,
   //          password: true,
   //          displayName: true,
   //          picture: true,
   //          method: true,
   //          isVerified: true,
   //          createdAt: true,
   //       },
   //    });
   //    if (!user) {
   //       throw new NotFoundException(`Пользователь с ID ${id} не найден`);
   //    }
   //    return plainToInstance(UserResponseDto, user);
   // }

   //
   // async remove(id: string) {
   //    const user = await this.findOne(id);
   //
   //    await this.prismaService.user.delete({
   //       where: { id: user.id },
   //    });
   //
   //    return { message: `Пользователь с ID ${id} успешно удален` };
   // }
}

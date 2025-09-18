import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { RegisterDto } from '../../auth/dto/register.dto';

export class UpdateUserDto {
   @ApiProperty({
      description: 'Email пользователя',
      example: 'example@mail.ru',
      type: String,
   })
   // @IsNotEmpty({ message: 'Email обязателен для заполнения' })
   // @IsString({ message: 'Email должен быть строкой' })
   // @IsEmail({}, { message: 'Email должен быть валидным' })
   email: string;

   @ApiProperty({ description: 'Пароль пользователя', example: 'strongPassword123', type: String })
   // @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
   // @IsString({ message: 'Пароль должен быть строкой' })
   @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
   password: string;

   @ApiProperty({ description: 'Имя пользователя', example: 'John Doe', type: String })
   // @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
   // @IsString({ message: 'Имя должно быть строкой' })
   displayName: string;
}

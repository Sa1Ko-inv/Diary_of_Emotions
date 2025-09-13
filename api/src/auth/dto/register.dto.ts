import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
   IsDate,
   IsEmail,
   IsNotEmpty,
   IsOptional,
   IsString,
   MaxLength,
   MinLength,
   Validate,
} from 'class-validator';

import { IsPasswordsMatchingConstraint } from '../../libs/common/decorator/is-passwords-matching-constraint.decorator';

export class RegisterDto {
   @ApiProperty({
      description: 'Имя пользователя',
      example: 'John Doe',
      type: String,
   })
   @IsString({ message: 'Имя должно быть строкой' })
   @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
   name: string

   @ApiProperty({
      description: 'Электронная почта пользователя',
      example: 'support@mail.ru',
      type: String,
   })
   @IsString({ message: 'Email должна быть строкой' })
   @IsNotEmpty({ message: 'Email обязательна для заполнения' })
   @IsEmail({}, { message: 'Email должна быть корректной' })
   email: string;

   @ApiProperty({
      description: 'Пароль пользователя',
      example: 'password123',
      type: String,
   })
   @IsString({ message: 'Пароль должен быть строкой' })
   @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
   @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
   @MaxLength(20, { message: 'Пароль должен быть не более 20 символов' })
   password: string;

   @ApiProperty({
      description: 'Пароль подтверждения пользователя',
      example: 'password123',
      type: String,
   })
   @IsString({ message: 'Пароль подтверждения должен быть строкой' })
   @IsNotEmpty({ message: 'Пароль подтверждения обязателен для заполнения' })
   @MinLength(6, {
      message: 'Пароль подтверждения должен быть не менее 6 символов',
   })
   @Validate(IsPasswordsMatchingConstraint, { message: 'пароли не совпадают' })
   passwordRepeat: string;

   // @IsOptional()
   // entries: object;
   //
   // @IsOptional()
   // achievements: object;
   //
   // @IsOptional()
   // notifications: object;
}

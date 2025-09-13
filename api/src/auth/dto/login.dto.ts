import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
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
  password: string;
}

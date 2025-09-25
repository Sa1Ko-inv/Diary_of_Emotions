import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
   @ApiProperty({
      description: 'Имя пользователя',
      example: 'John Doe',
      type: String,
   })
   @IsString({ message: 'Имя должно быть строкой' })
   name?: string;

   @ApiProperty({
      description: 'Email пользователя',
      example: 'example@mail.ru',
      type: String,
   })
   @IsOptional()
   @IsString({ message: 'Email должен быть строкой' })
   @IsEmail({}, { message: 'Email должен быть валидным' })
   email?: string;

   @ApiProperty({
      description: 'Пароль пользователя',
      example: 'strongPassword123',
      type: String,
      minLength: 6,
   })
   @IsOptional()
   @IsString({ message: 'Пароль должен быть строкой' })
   @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
   password?: string;

   @ApiProperty({
      description: 'Картинка профиля пользователя',
      example: 'https://example.com/profile.jpg',
      type: String,
   })
   @IsOptional()
   @IsString({ message: 'Картинка профиля должна быть строкой' })
   picture?: string;

   @ApiProperty({
      description: 'Включена ли двухфакторная аутентификация',
      example: false,
      type: Boolean,
   })
   @IsOptional()
   @IsBoolean({ message: 'isTwoFactorEnabled должен быть булевым значением' })
   isTwoFactorEnabled?: boolean;
}

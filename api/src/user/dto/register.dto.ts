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
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'support@mail.ru',
    type: Date,
  })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  @IsEmail({}, { message: 'Почта должна быть корректной' })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password123',
    type: String,
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @MaxLength(20, { message: 'Пароль должен быть не более 20 символов' })
  password: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
    type: String,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  lastName: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
    type: String,
  })
  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  firstName: string;

  @ApiProperty({
    description: 'Дата рождения пользователя в формате dd/mm/yyyy',
    example: '09/09/1999',
    type: String,
  })
  @IsNotEmpty({ message: 'Дата рождения не может быть пустой' })
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(`${year}-${month}-${day}`);
  })
  @IsDate({ message: 'Дата рождения должна быть корректной датой dd/mm/yyyy' })
  birthDate: Date;

  // @IsOptional()
  // entries: object;
  //
  // @IsOptional()
  // achievements: object;
  //
  // @IsOptional()
  // notifications: object;
}

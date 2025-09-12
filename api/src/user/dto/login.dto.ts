import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginRequest {
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  @IsEmail({}, { message: 'Почта должна быть корректной' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @MaxLength(20, { message: 'Пароль должен быть не более 20 символов' })
  password: string;
}

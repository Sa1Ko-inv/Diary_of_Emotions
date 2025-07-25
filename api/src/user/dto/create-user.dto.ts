import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// TODO: проверить валидацию
export class CreateUserDto {
  @IsString({message: 'Почта должна быть строкой'})
  @IsNotEmpty({message: 'Почта не может быть пустой'})
  @IsEmail({}, {message: 'Почта должна быть корректной'})
  email: string;

  @IsString({message: 'Пароль должен быть строкой'})
  @IsNotEmpty({message: 'Пароль не может быть пустым'})
  password: string;

  @IsString({message: 'Имя должно быть строкой'})
  @IsNotEmpty({message: 'Имя не может быть пустым'})
  lastName: string;

  @IsString({message: 'Фамилия должна быть строкой'})
  @IsNotEmpty({message: 'Фамилия не может быть пустой'})
  firstName: string;

  @IsDate({message: 'Дата рождения должна быть корректной датой'})
  @IsNotEmpty({message: 'Дата рождения не может быть пустой'})
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

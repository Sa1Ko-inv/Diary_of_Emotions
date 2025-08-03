import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class RegisterDto {
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  @IsEmail({}, { message: 'Почта должна быть корректной' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @MaxLength(20, { message: 'Пароль должен быть не более 20 символов' })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  lastName: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  firstName: string;

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

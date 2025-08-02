import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

//
// import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
// import { Transform } from 'class-transformer';
//
// export class UpdateUserDto {
//   @IsOptional()
//   @IsEmail()
//   email?: string;
//
//   @IsOptional()
//   @IsString()
//   password?: string;
//
//   @IsOptional()
//   @IsString()
//   lastName?: string;
//
//   @IsOptional()
//   @IsString()
//   firstName?: string;
//
// @IsOptional()
// @Transform(({ value }) => {
//   if (!value) return undefined;
//   // Обрабатываем как строку "dd/mm/yyyy" или Date
//   if (value instanceof Date) return value;
//   const [day, month, year] = value.split('/');
//   return new Date(`${year}-${month}-${day}`);
// })
// @IsDate()
// birthDate?: Date;
// }
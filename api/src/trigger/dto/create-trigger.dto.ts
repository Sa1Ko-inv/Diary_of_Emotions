import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTriggerDto {
  @IsString({ message: 'Описание должно быть строкой' })
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  label: string;

  @IsOptional()
  createdBy?: string;
}

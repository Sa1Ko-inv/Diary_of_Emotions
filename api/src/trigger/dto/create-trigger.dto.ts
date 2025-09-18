import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTriggerDto {
   @ApiProperty({
      description: 'Название триггера',
      example: 'Триггер 1',
      type: String,
   })
   @IsString({ message: 'Описание должно быть строкой' })
   @IsNotEmpty({ message: 'Описание не может быть пустым' })
   label: string;

   @ApiPropertyOptional({
      description: 'ID пользователя, создавшего триггер',
      example: '5494bb47-e586-4272-9f3f-b5db6b19bde9',
      type: String,
   })
   @IsOptional()
   createdBy?: string;
}

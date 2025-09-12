import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class EmotionItemDto {
  @ApiProperty({
    description: 'Уникальный идентификатор типа эмоции',
    example: '5494bb47-e586-4272-9f3f-b5db6b19bde9',
    type: 'string',
  })
  @IsUUID()
  emotionTypeId: string;

  @ApiProperty({
    description: 'Интенсивность эмоции от 1 до 10',
    example: 5,
    type: 'number',
  })
  @IsInt()
  @Min(1, { message: 'Оценка должна быть не менее 1' })
  @Max(10, { message: 'Оценка должна быть не более 10' })
  intensity: number;
}

export class CreateEntryDto {
  @ApiPropertyOptional({
    description: 'Дата записи в формате DD/MM/YYYY',
    example: '09/09/2023',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    description: 'Описание записи',
    example: 'Сегодня был тяжелый день',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Эмоции, связанные с записью',
    type: [EmotionItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionItemDto)
  emotions: EmotionItemDto[];

  @ApiProperty({
    description: 'Триггеры, связанные с записью',
    type: [String],
    example: ['Триггер 1', 'Триггер 2'],
  })
  @IsArray()
  @IsString({ each: true })
  triggers: string[];
}

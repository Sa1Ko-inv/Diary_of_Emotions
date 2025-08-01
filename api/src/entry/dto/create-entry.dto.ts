import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
  IsUUID,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class EmotionItemDto {
  @IsUUID()
  emotionTypeId: string;

  @IsInt()
  @Min(1, { message: 'Оценка должна быть не менее 1' })
  @Max(10, { message: 'Оценка должна быть не более 10' })
  intensity: number;
}

export class CreateEntryDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionItemDto)
  emotions: EmotionItemDto[];

  @IsArray()
  @IsString({ each: true })
  triggers: string[];
}

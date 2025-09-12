// entry.dto.ts
import { Expose, Transform } from 'class-transformer';

export class EntryResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  @Transform(({ value }) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  })
  date: string;

  @Expose()
  description: string;

  @Expose()
  emotions: {
    emotionTypeId: string;
    intensity: number;
  }[];
  @Expose()
  triggers: string[];
}

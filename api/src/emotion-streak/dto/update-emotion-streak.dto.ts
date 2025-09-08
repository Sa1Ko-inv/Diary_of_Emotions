import { PartialType } from '@nestjs/swagger';
import { CreateEmotionStreakDto } from './create-emotion-streak.dto';

export class UpdateEmotionStreakDto extends PartialType(CreateEmotionStreakDto) {}

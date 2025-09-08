import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmotionStreakService } from './emotion-streak.service';
import { CreateEmotionStreakDto } from './dto/create-emotion-streak.dto';
import { UpdateEmotionStreakDto } from './dto/update-emotion-streak.dto';
import { Authorization } from '../user/decorator/authorization.decorator';
import { Authorized } from '../user/decorator/authorized.decorator';

@Controller('emotion-streak')
export class EmotionStreakController {
  constructor(private readonly emotionStreakService: EmotionStreakService) {}

  @Post()
  create(@Body() createEmotionStreakDto: CreateEmotionStreakDto) {
    return this.emotionStreakService.create(createEmotionStreakDto);
  }

  @Authorization()
  @Get()
  async getUserStreaks(@Authorized('id') id: string) {

    return this.emotionStreakService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emotionStreakService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmotionStreakDto: UpdateEmotionStreakDto) {
    return this.emotionStreakService.update(+id, updateEmotionStreakDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emotionStreakService.remove(+id);
  }
}

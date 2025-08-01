import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';

@Controller('trigger')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Post()
  create(@Body() dto: CreateTriggerDto) {
    const testOrderBy = '5494bb47-e586-4272-9f3f-b5db6b19bde9'
    return this.triggerService.create(testOrderBy, dto);
  }

  @Get()
  findAll() {
    return this.triggerService.findAll();
  }

  @Get('created-by')
  findCreatedBy() {
    return this.triggerService.findCreatedByUser()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.triggerService.findOne(id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTriggerDto: UpdateTriggerDto) {
    return this.triggerService.update(id, updateTriggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triggerService.remove(id);
  }
}

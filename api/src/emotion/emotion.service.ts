import { Injectable } from '@nestjs/common';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmotionService {
  constructor(private readonly prismaService: PrismaService) {}

  // create(createEmotionDto: CreateEmotionDto) {
  //   return 'This action adds a new emotion';
  // }

  async findAllGroup() {
    const emotions = await this.prismaService.emotionGroup.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        color: true,
        types: {
          select: {
            id: true,
            name: true,
            groupId: true,
          },
        },
      },
    });

    return emotions;
  }

  async findAllTypes() {
    const emotionsTypes = await this.prismaService.emotionType.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        groupId: true,
        group: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    return emotionsTypes;
  }

  findOneGroups(id: string) {
    const emotionGroup = this.prismaService.emotionGroup.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        color: true,
        types: {
          select: {
            id: true,
            name: true,
            groupId: true,
          },
        },
      },
    });
    return emotionGroup;
  }

  findOneTypes(id: string) {
    const emotionType = this.prismaService.emotionType.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        groupId: true,
        group: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });
    return emotionType;
  }

  //
  // update(id: number, updateEmotionDto: UpdateEmotionDto) {
  //   return `This action updates a #${id} emotion`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} emotion`;
  // }
}

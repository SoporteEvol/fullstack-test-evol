import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';
import { TagsController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagService],
})
export class TagModule {}

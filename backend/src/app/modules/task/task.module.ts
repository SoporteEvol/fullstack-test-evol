import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TagService],
  imports: [SequelizeModule.forFeature([Task, Tag])],
})
export class TaskModule {}

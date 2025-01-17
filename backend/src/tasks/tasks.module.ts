import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { TasksRepository } from './repositories/tasks.repository';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}

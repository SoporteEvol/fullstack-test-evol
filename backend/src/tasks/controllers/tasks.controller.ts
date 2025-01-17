import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from 'src/tasks/models/task.model';
import { TasksService } from '../services/tasks.service';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  async createTask(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.update(+id, taskData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(+id);
  }

  @Get('/tags')
  async getTags() {
    return this.tasksService.getTags();
  }
}

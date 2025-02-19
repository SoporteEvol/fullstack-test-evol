import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.createTask(taskData);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.updateTask(id, taskData);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}

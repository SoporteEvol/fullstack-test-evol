import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  async getFilteredTasks(@Query() filterParams: FilterTaskDTO) {
    const { completed, startDate, endDate } = filterParams;
    return this.tasksService.getFilteredTasks(completed, startDate, endDate);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }
}

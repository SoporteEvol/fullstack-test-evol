import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    return {
      message: 'Se ha creado la tarea correctamente',
      data: task,
    }
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return {
      message: 'Lista de todas las tareas',
      data: tasks,
    };
  }

  @Get("tags")
  async findTags() {
    const tasks = await this.tasksService.findAll();
    const tags = tasks.flatMap(task => task.tags);

    return {
      message: 'Lista de todas las etiquetas',
      data: Array.from(new Set(tags)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);

    if (!task) {
      return {
        message: 'No se encontró la tarea',
      };
    }

    return {
      message: 'Tarea encontrada',
      data: task,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTasks = await this.tasksService.update(+id, updateTaskDto);

    return {
      message: 'Tarea actualizada correctamente',
      data: updatedTasks,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(+id);
    return {
      message: 'Tarea eliminada correctamente',
    };
  }
}
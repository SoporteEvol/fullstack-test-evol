import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const taskData = {
        ...createTaskDto,
        tags: createTaskDto.tags ? JSON.stringify(createTaskDto.tags) : undefined,
      };
      return this.taskRepository.create(taskData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return this.taskRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Task | null> {
    try {
      return this.taskRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<[number, Task[]]> {
    try {
      const taskData = {
        ...updateTaskDto,
        tags: updateTaskDto.tags ? JSON.stringify(updateTaskDto.tags) : undefined,
      };

      return this.taskRepository.update(id, taskData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      return this.taskRepository.destroy(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
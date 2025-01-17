import { Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { TasksRepository } from '../repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    return this.tasksRepository.create(taskData);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    return this.tasksRepository.update(id, taskData);
  }

  async delete(id: number): Promise<void> {
    return this.tasksRepository.delete(id);
  }

  async getTags(): Promise<string[]> {
    return this.tasksRepository.getTags();
  }
}

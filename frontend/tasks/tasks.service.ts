import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    return this.taskModel.create(data);
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task> {
    await this.taskModel.update(data, { where: { id } });
    return this.taskModel.findByPk(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskModel.destroy({ where: { id } });
  }
}

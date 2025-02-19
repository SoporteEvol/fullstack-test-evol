import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    return this.taskModel.create(taskData);
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.taskModel.update(taskData, { where: { id } });
    return this.taskModel.findByPk(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskModel.destroy({ where: { id } });
  }
}

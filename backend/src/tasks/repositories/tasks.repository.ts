import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../models/task.model';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    return this.taskModel.create(taskData);
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    const task = await this.taskModel.findByPk(id);
    if (task) {
      return task.update(taskData);
    }
    throw new Error('Task not found');
  }

  async delete(id: number): Promise<void> {
    const task = await this.taskModel.findByPk(id);
    if (task) {
      await task.destroy();
    } else {
      throw new Error('Task not found');
    }
  }

  async getTags(): Promise<string[]> {
    const sequelize = this.taskModel.sequelize;
    const results = await this.taskModel.findAll({
      attributes: [[sequelize.fn('UNNEST', sequelize.col('tags')), 'tag']],
      group: ['tag'],
    });

    return results.map((result: any) => result.tag);
  }
}

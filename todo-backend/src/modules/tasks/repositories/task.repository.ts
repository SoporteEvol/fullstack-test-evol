import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) { }

  async create(taskData: Partial<Task>): Promise<Task> {
    return this.taskModel.create(taskData);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.taskModel.findByPk(id);
  }

  async update(id: number, updateData: Partial<Task>): Promise<[number, Task[]]> {
    console.log('updateData', updateData);
    return this.taskModel.update(updateData, {
      where: { id },
      returning: true,
    });
  }

  async destroy(id: number): Promise<void> {
    await this.taskModel.destroy({ where: { id } });
  }
}
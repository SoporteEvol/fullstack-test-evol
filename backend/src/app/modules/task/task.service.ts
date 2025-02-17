import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Tag } from '../tag/entities/tag.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { taskToDto } from './mapper/task.mapper';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private readonly taskModel: typeof Task,
    @InjectModel(Tag) private readonly tagModel: typeof Tag,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    const { tags, ...taskData } = createTaskDto;

    try {
      const task = await this.taskModel.create({
        ...taskData,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      });

      if (tags && tags.length > 0) {
        console.log(tags);
        const tagsEntities = await Promise.all(
          tags.map(async (tagName) => {
            let tag = await this.tagModel.findOne({ where: { name: tagName } });

            if (!tag) {
              tag = await this.tagModel.create({ name: tagName });
            }

            return tag;
          }),
        );

        await task.$set('tags', tagsEntities);
      }
      const taskWithTags = await task.reload({
        include: { model: Tag },
      });
      return taskToDto(taskWithTags);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error(
        'Ocurrió un error al crear la tarea. Intenta nuevamente.',
      );
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const task = await this.taskModel.findByPk(id, {
      include: {
        model: Tag,
        through: { attributes: [] },
      },
    });

    if (!task) {
      throw new NotFoundException(`La tarea con ID ${id} no fue encontrada`);
    }

    const tagsToCheck = task.tags;

    await task.destroy();

    for (const tag of tagsToCheck) {
      const count = await this.taskModel.count({
        include: {
          model: Tag,
          where: { id: tag.id },
          through: { attributes: [] },
        },
      });

      if (count === 0) {
        await tag.destroy();
      }
    }

    return { message: `La tarea fue eliminada correctamente` };
  }

  async getFilteredTasks(
    completed?: string,
    startDate?: string,
    endDate?: string,
  ) {
    const where: any = {};

    if (completed !== undefined) {
      where.completed = completed === 'true';
    }

    if (startDate) {
      where.dueDate = { ...where.dueDate, [Op.gte]: new Date(startDate) };
    }

    if (endDate) {
      where.dueDate = { ...where.dueDate, [Op.lte]: new Date(endDate) };
    }

    const tasks = await this.taskModel.findAll({
      where,
      include: {
        model: Tag,
        attributes: ['name'],
        through: { attributes: [] },
      },
      order: [['updatedAt', 'DESC']],
    });

    return tasks.map(taskToDto);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<any> {
    const task = await this.taskModel.findByPk(id, {
      include: {
        model: Tag,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    task.title = updateTaskDto.title || task.title;
    task.description = updateTaskDto.description || task.description;
    task.completed = updateTaskDto.completed ?? task.completed;
    task.dueDate = updateTaskDto.dueDate
      ? new Date(updateTaskDto.dueDate)
      : task.dueDate;

    const oldTags = task.tags.map((tag) => tag.id);

    const { tags } = updateTaskDto;

    if (tags) {
      const tagsEntities = await Promise.all(
        tags.map(async (tagName) => {
          let tag = await this.tagModel.findOne({ where: { name: tagName } });
          if (!tag) {
            tag = await this.tagModel.create({ name: tagName });
          }
          return tag;
        }),
      );

      await task.$set('tags', tagsEntities);

      const newTags = tagsEntities.map((tag) => tag.id);

      const tagsToRemove = oldTags.filter((tagId) => !newTags.includes(tagId));

      for (const tagId of tagsToRemove) {
        const tag = await this.tagModel.findByPk(tagId);
        if (tag) {
          const taskCount = await this.taskModel.count({
            include: {
              model: Tag,
              where: { id: tag.id },
              through: { attributes: [] },
            },
          });

          if (taskCount === 0) {
            await tag.destroy();
          }
        }
      }
    }

    await task.save();

    const updatedTask = await this.taskModel.findByPk(id, {
      include: {
        model: Tag,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed,
      dueDate: updatedTask.dueDate ? updatedTask.dueDate.toISOString() : null,
      tags: updatedTask.tags.map((tag) => tag.name),
    };
  }
}

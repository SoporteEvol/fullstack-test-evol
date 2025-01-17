import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { TasksRepository } from './tasks.repository';
import { Task } from '../models/task.model';
import { Sequelize } from 'sequelize';

describe('TasksRepository', () => {
  let repository: TasksRepository;
  let taskModel: typeof Task;

  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    save: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockTaskModel = {
    findAll: jest.fn().mockResolvedValue([mockTask]),
    create: jest.fn().mockResolvedValue(mockTask),
    findByPk: jest.fn().mockResolvedValue(mockTask),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksRepository,
        {
          provide: getModelToken(Task),
          useValue: mockTaskModel,
        },
        {
          provide: Sequelize,
          useValue: {
            fn: jest.fn,
            col: jest.fn,
            literal: jest.fn,
            where: jest.fn,
          },
        },
      ],
    }).compile();

    repository = module.get<TasksRepository>(TasksRepository);
    taskModel = module.get<typeof Task>(getModelToken(Task));
    module.get<Sequelize>(Sequelize);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = await repository.findAll();
      expect(tasks).toEqual([mockTask]);
      expect(taskModel.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'New Task', description: 'New Description' };
      const task = await repository.create(taskData);
      expect(task).toEqual(mockTask);
      expect(taskModel.create).toHaveBeenCalledWith(taskData);
    });
  });

  describe('update', () => {
    it('should update an existing task', async () => {
      const taskData = { title: 'Updated Task' };
      mockTask.update.mockResolvedValue({ ...mockTask, ...taskData });
      const task = await repository.update(1, taskData);
      expect(task).toEqual({ ...mockTask, ...taskData });
      expect(taskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTask.update).toHaveBeenCalledWith(taskData);
    });

    it('should throw an error if task not found', async () => {
      mockTaskModel.findByPk.mockResolvedValue(null);
      await expect(
        repository.update(1, { title: 'Updated Task' }),
      ).rejects.toThrow('Task not found');
    });
  });

  describe('delete', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should delete an existing task', async () => {
      mockTaskModel.findByPk.mockResolvedValue(mockTask);
      await repository.delete(1);
      expect(taskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTask.destroy).toHaveBeenCalled();
    });

    it('should throw an error if task not found', async () => {
      mockTaskModel.findByPk.mockResolvedValue(null);
      await expect(repository.delete(1)).rejects.toThrow('Task not found');
    });
  });

  describe.skip('getTags', () => {
    it('should return an array of unique tags', async () => {
      const mockTags = ['tag1', 'tag2', 'tag3'];
      const mockResults = mockTags.map((tag) => ({ tag }));
      jest.spyOn(taskModel.sequelize, 'fn').mockReturnValue({
        clone: jest.fn(),
      } as any);
      jest.spyOn(taskModel, 'findAll').mockResolvedValue(mockResults as any);

      const tags = await repository.getTags();
      expect(tags).toEqual(mockTags);
      expect(taskModel.findAll).toHaveBeenCalledWith({
        attributes: ['tag'],
        group: ['tag'],
      });
    });
  });
});

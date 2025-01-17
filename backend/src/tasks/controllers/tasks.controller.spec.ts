import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { TasksRepository } from '../repositories/tasks.repository';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, title: 'Test Task 1', description: 'Test Description 1' },
      { id: 2, title: 'Test Task 2', description: 'Test Description 2' },
    ]),
    create: jest
      .fn()
      .mockImplementation((taskData: Partial<Task>) =>
        Promise.resolve({ id: Date.now(), ...taskData }),
      ),
    update: jest
      .fn()
      .mockImplementation((id: number, taskData: Partial<Task>) =>
        Promise.resolve({ id, ...taskData }),
      ),
    delete: jest.fn().mockResolvedValue(undefined),
    getTags: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
        {
          provide: TasksRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const result = await controller.getAllTasks();
    expect(result).toEqual([
      { id: 1, title: 'Test Task 1', description: 'Test Description 1' },
      { id: 2, title: 'Test Task 2', description: 'Test Description 2' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a new task', async () => {
    const taskData = { title: 'New Task', description: 'New Description' };
    const result = await controller.createTask(taskData);
    expect(result).toEqual(expect.objectContaining(taskData));
    expect(service.create).toHaveBeenCalledWith(taskData);
  });

  it('should update a task', async () => {
    const taskData = {
      title: 'Updated Task',
      description: 'Updated Description',
    };
    const result = await controller.updateTask('1', taskData);
    expect(result).toEqual({ id: 1, ...taskData });
    expect(service.update).toHaveBeenCalledWith(1, taskData);
  });

  it('should delete a task', async () => {
    const result = await controller.deleteTask('1');
    expect(result).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith(1);
  });

  it('should return an array of tags', async () => {
    const mockTags = ['tag1', 'tag2', 'tag3'];
    jest.spyOn(service, 'getTags').mockResolvedValue(mockTags);

    const result = await controller.getTags();
    expect(result).toEqual(mockTags);
    expect(service.getTags).toHaveBeenCalled();
  });
});

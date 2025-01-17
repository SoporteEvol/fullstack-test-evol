import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from '../repositories/tasks.repository';
import { Task } from '../models/task.model';

describe('TasksService', () => {
  let service: TasksService;
  let repository: TasksRepository;

  const mockTaskRepository = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]),
    create: jest.fn().mockResolvedValue({ id: 1, title: 'New Task' }),
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Task' }),
    delete: jest.fn().mockResolvedValue(undefined),
    getTags: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: mockTaskRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tasks', async () => {
    const tasks = await service.findAll();
    expect(tasks).toEqual([{ id: 1, title: 'Test Task' }]);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should create a new task', async () => {
    const taskData: Partial<Task> = { title: 'New Task' };
    const task = await service.create(taskData);
    expect(task).toEqual({ id: 1, title: 'New Task' });
    expect(repository.create).toHaveBeenCalledWith(taskData);
  });

  it('should update a task', async () => {
    const taskData: Partial<Task> = { title: 'Updated Task' };
    const task = await service.update(1, taskData);
    expect(task).toEqual({ id: 1, title: 'Updated Task' });
    expect(repository.update).toHaveBeenCalledWith(1, taskData);
  });

  it('should delete a task', async () => {
    await service.delete(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should return all tags', async () => {
    const mockTags = ['urgent', 'home', 'work'];
    jest.spyOn(repository, 'getTags').mockResolvedValue(mockTags);

    const tags = await service.getTags();
    expect(tags).toEqual(mockTags);
    expect(repository.getTags).toHaveBeenCalled();
  });
});

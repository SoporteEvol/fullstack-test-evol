import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/sequelize';
import { Task } from 'Task';

describe('TasksService', () => {
  let service: TasksService;
  let mockTaskModel;

  beforeEach(async () => {
    mockTaskModel = {
      create: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
      findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]),
      findByPk: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
      destroy: jest.fn().mockResolvedValue(1),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken(Task), useValue: mockTaskModel },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('debería crear una tarea', async () => {
    expect(await service.createTask({ title: 'Test Task', description: '' })).toEqual({ id: 1, title: 'Test Task' });
  });

  it('debería obtener todas las tareas', async () => {
    expect(await service.getTasks()).toHaveLength(1);
  });

  it('debería eliminar una tarea', async () => {
    expect(await service.deleteTask(1)).toBeUndefined();
  });
});

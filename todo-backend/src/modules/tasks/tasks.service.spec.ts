import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './repositories/task.repository';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockTask]),
            findOne: jest.fn().mockResolvedValue(mockTask),
            create: jest.fn().mockResolvedValue(mockTask),
            update: jest.fn().mockResolvedValue(mockTask),
            destroy: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('Debe obtener todas las tareas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockTask]);
  });

  it('Debe obtener una tarea por ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockTask);
  });

  it('Debe crear una nueva tarea', async () => {
    const newTask = { title: 'Nueva Tarea', description: 'Descripción' };
    const result = await service.create(newTask as any);
    expect(result).toEqual(mockTask);
  });

  it('Debe actualizar una tarea', async () => {
    const result = await service.update(1, { title: 'Actualizado' } as any);
    expect(result).toEqual(mockTask);
  });

  it('Debe eliminar una tarea', async () => {
    const result = await service.remove(1);
    expect(result).toEqual(1);
  });
});

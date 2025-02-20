import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
};

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockTask]),
            findOne: jest.fn().mockResolvedValue(mockTask),
            create: jest.fn().mockResolvedValue(mockTask),
            update: jest.fn().mockResolvedValue(mockTask),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('Debe obtener todas las tareas', async () => {
    const result = await controller.findAll();
    expect(result).toEqual({
      "message": "Lista de todas las tareas",
      "data": [mockTask]
    });
  });

  it('Debe obtener una tarea por ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({
      "message": "Tarea encontrada",
      "data": mockTask
    });
  });

  it('Debe crear una tarea', async () => {
    const newTask = { title: 'Nueva Tarea', description: 'Descripción' };
    const result = await controller.create(newTask);
    
    expect(result).toEqual({
      "message": "Se ha creado la tarea correctamente",
      "data": mockTask
    });
  });

  it('Debe actualizar una tarea', async () => {
    const result = await controller.update('1', { completed: true });

    expect(result).toEqual({
      "message": "Tarea actualizada correctamente",
      "data": mockTask
    });
  });

  it('Debe eliminar una tarea', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({"message": "Tarea eliminada correctamente"});
  });
});

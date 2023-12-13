import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskStatus } from './entities/tasks.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  const mockService: Partial<TasksService> = {
    findAll: () =>
      Promise.resolve([
        {
          id: '1',
          title: 'Dancing',
          description: 'to Bon Jovi',
          category: 'Dance',
          status: 'OPEN',
        },
      ]),
    findOne: (id: string) =>
      Promise.resolve({
        id,
        title: 'Dancing',
        description: 'to Bon Jovi',
        categoryId: 'df43707a-a93c-49f9-b83f-148db71cc244',
        status: TaskStatus.OPEN,
      }),
    create: (task: CreateTaskDto) =>
      Promise.resolve({
        ...task,
        status: TaskStatus.OPEN,
        id: '54470841-4db9-447f-81f9-4f1fee642f5b',
        categoryId: 'df43707a-a93c-49f9-b83f-148db71cc244',
      }),
    update: (id: string, task: UpdateTaskDto) => {
      id = '54470841-4db9-447f-81f9-4f1fee642f5b';
      task = {
        status: TaskStatus.IN_PROGRESS,
      };
      return Promise.resolve({ ...task });
    },
    delete: () => Promise.resolve(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should be be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an array of tasks', async () => {
      const tasks = await controller.findAll();

      expect(tasks).toBeDefined();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBeGreaterThan(0);
    });
    it('should return empty array when there is no task', async () => {
      jest.spyOn(mockService, 'findAll').mockResolvedValueOnce([]);
      const tasks = await controller.findAll();
      expect(tasks).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('it should return a task', async () => {
      const task = await controller.findOne('12');
      expect(task).toBeDefined();
      expect(task.id).toBe('12');
    });
    it('should return a 404 ERROR when the id is not found', async () => {
      jest.spyOn(mockService, 'findOne').mockResolvedValueOnce(null);
      try {
        const task = await controller.findOne('9');
        return task;
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should return the object of the task created', async () => {
      const task = await controller.create({
        id: '345gh678-hki8656',
        title: 'Danceing',
        description: 'to Bon Jovi',
        category: 'Dance',
      });
      expect(task).toBeDefined();
    });
    it('should return a 404 ERROR when the task is not created', async () => {
      jest.spyOn(mockService, 'create').mockResolvedValueOnce(null);
      try {
        const task = await controller.create({
          id: '345gh678-hki8iiii656',
          title: 'Danceing',
          description: 'to Bon Jovi',
          category: 'Dance',
        });
        return task;
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('update', () => {
    it('should return a task object', async () => {
      const task = await controller.update(
        '6aba3c74-a249-4156-8176-94da9e60ae91',
        {
          status: TaskStatus.IN_PROGRESS,
        },
      );
      expect(task.status).toEqual(TaskStatus.IN_PROGRESS);
    });
    it('should return a 404 ERROR response when no task with the specified id is found', async () => {
      jest.spyOn(mockService, 'update').mockResolvedValueOnce(null);
      try {
        await controller.update('123', {
          status: TaskStatus.IN_PROGRESS,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should return a task object', async () => {
      const task = await controller.remove(
        '6aba3c74-a249-4156-8176-94da9e60ae91',
      );
      expect(task).toEqual(undefined);
    });
    it('should return a 404 ERROR response when no task with the specified id is found', async () => {
      jest.spyOn(mockService, 'delete').mockResolvedValueOnce(null);
      try {
        await controller.remove('123');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

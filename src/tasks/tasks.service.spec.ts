import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './entities/tasks.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  const mockTaskRepository: Partial<TasksRepository> = {
    findAll: () =>
      Promise.resolve([
        {
          id: '1',
          title: 'Dancing',
          description: 'to Bon Jovi',
          category: 'Dance',
          status: TaskStatus.OPEN,
        },
      ]),
    find: (key: string) => {
      return Promise.resolve({
        id: key,
        title: 'Dancing',
        description: 'to Bon Jovi',
        category: 'Dance',
        categoryId: 'df43707a-a93c-49f9-b83f-148db71cc244',
        status: TaskStatus.OPEN,
      });
    },
    findOne: (id: string) => {
      return Promise.resolve({
        id,
        title: 'Dancing',
        description: 'to Bon Jovi',
        category: 'Dance',
        categoryId: 'df43707a-a93c-49f9-b83f-148db71cc244',
        status: TaskStatus.OPEN,
      });
    },

    create: () =>
      Promise.resolve({
        id: '54470841-4db9-447f-81f9-4f1fee642f5b',
        title: 'Dancing',
        description: 'to Bon Jovi',
        status: TaskStatus.OPEN,
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
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: mockTaskRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = await service.findAll();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBeGreaterThan(0);
    });

    it('should return an empty array when there is no task', async () => {
      jest.spyOn(mockTaskRepository, 'findAll').mockResolvedValueOnce([]);
      const tasks = await service.findAll();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('When the task with the given id is found; should return a task object', async () => {
      const task = await service.findOne(
        '54470841-4db9-447f-81f9-4f1fee642f5b',
      );
      expect(task.id).toEqual('54470841-4db9-447f-81f9-4f1fee642f5b');
    });

    it('should return a 404 ERROR response when no task with the specified id is found', async () => {
      jest.spyOn(mockTaskRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await service.findOne('54470841-4db9-447f-81f9-4f1fee642f5b');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should return a task object', async () => {
      const task = await service.create({
        id: '54470841-4db9-447f-81f9-4f1fee642f5b',
        title: 'Dancing',
        description: 'to Bon Jovi',
        category: 'Dance',
      });
      expect(task.id).toEqual('54470841-4db9-447f-81f9-4f1fee642f5b');
    });
  });

  describe('update', () => {
    it('should return a task object', async () => {
      const task = await service.update(
        '6aba3c74-a249-4156-8176-94da9e60ae91',
        {
          status: TaskStatus.IN_PROGRESS,
        },
      );
      expect(task.status).toEqual(TaskStatus.IN_PROGRESS);
    });
    it('should return a 404 ERROR response when no task with the specified id is found', async () => {
      jest.spyOn(mockTaskRepository, 'update').mockResolvedValueOnce(null);
      try {
        await service.update('123', {
          status: TaskStatus.IN_PROGRESS,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should return a task object', async () => {
      const task = await service.delete('6aba3c74-a249-4156-8176-94da9e60ae91');
      expect(task).toEqual(undefined);
    });
    it('should return a 404 ERROR response when no task with the specified id is found', async () => {
      jest.spyOn(mockTaskRepository, 'delete').mockResolvedValueOnce(null);
      try {
        await service.delete('123');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

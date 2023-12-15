import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from '../helpers/dataBase';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  async findAll() {
    try {
      return await this.tasksRepository.findAll();
    } catch (error) {
      throw new NotFoundException('Tasks not found');
    }
  }
  async findOne(key: string) {
    try {
      const task = await this.tasksRepository.find(key);
      if (!task)
        throw new NotFoundException('Task with the specified id is not found');
      return task;
    } catch (error) {
      throw error;
    }
  }
  async create(task: CreateTaskDto) {
    const categoryPosition = await db.getIndex(
      '/categories',
      task.category,
      'categoryName',
    );
    if (categoryPosition === -1)
      throw new NotFoundException(
        'Category with the specified name is not found, please create it first',
      );
    try {
      const category = await db.getData(`/categories[${categoryPosition}]`);
      const taskCreated = await this.tasksRepository.create({
        ...task,
        categoryId: category.id,
        status: TaskStatus.OPEN,
      });
      return taskCreated;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  async update(id: string, updatedTask: UpdateTaskDto) {
    try {
      const position = await db.getIndex(`/tasks`, id);
      if (position < 0)
        throw new NotFoundException('Task with the specified id is not found');
      return await this.tasksRepository.update(position + '', updatedTask);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string) {
    try {
      const index = await db.getIndex(`/tasks`, id);
      if (index < 0)
        throw new NotFoundException('Task with the specified id is not found');
      return await this.tasksRepository.delete(index + '');
    } catch (error) {
      throw error;
    }
  }
}

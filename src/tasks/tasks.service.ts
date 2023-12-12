import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { db } from 'src/main';
import { TaskStatus } from './entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async findAll() {
    try {
      return await this.tasksRepository.findAll();
    } catch (error) {
      throw new NotFoundException('Tasks not found');
    }
  }
  async findOne(key: string) {
    try {
      return await this.tasksRepository.findOne(key);
    } catch (error) {
      throw new NotFoundException('Task with the specified id is not found');
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
    const task = await this.tasksRepository.findOne(id);
    if (!task)
      throw new NotFoundException('Task with the specified id is not found');
    return await this.tasksRepository.update(id, updatedTask);
  }
  async delete(id: string) {
    return await this.tasksRepository.delete(id);
  }
}

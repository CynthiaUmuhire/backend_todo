import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
    try {
      const taskCreated = await this.tasksRepository.create(task);
      return taskCreated;
    } catch (error) {
      throw new ConflictException('Task could not be created');
    }
  }
  async update(id: string, updatedTask: UpdateTaskDto) {
    return await this.tasksRepository.update(id, updatedTask);
  }
  async delete(id: string) {
    return await this.tasksRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './entities/tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = new JsonDB(new Config('tasks', true, false, '/'));

  async findAll() {
    return await this.tasks.getData('/');
  }

  async findOne(key: string) {
    return await this.tasks.getData(`/${key}`);
  }

  async create(task: CreateTaskDto) {
    const key = uuidv4();
    const createdTask = await this.tasks.push(`/${key}`, {
      ...task,
      id: key,
      status: TaskStatus.OPEN,
    });
    return createdTask;
  }
  async update(id: string, updatedTask: UpdateTaskDto) {
    const task = await this.tasks.push(`/${id}`, {
      ...updatedTask,
    });
    return task;
  }

  async delete(id: string) {
    return await this.tasks.delete(`/${id}`);
  }
}

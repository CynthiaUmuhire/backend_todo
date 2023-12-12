import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './entities/tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { db } from 'src/main';

@Injectable()
export class TasksService {
  async findAll() {
    return await db.getData('/tasks');
  }

  async findOne(key: string) {
    return await db.getData(`/tasks/${key}`);
  }

  async create(task: CreateTaskDto) {
    const key = uuidv4();
    const createdTask = await db.push(`/tasks/${key}`, {
      ...task,
      id: key,
      status: TaskStatus.OPEN,
    });
    return createdTask;
  }
  async update(id: string, updatedTask: UpdateTaskDto) {
    const Originaltask = await db.getData(`/tasks/${id}`);

    const task = await db.push(`/tasks/${id}[]`, {
      ...Originaltask,
      ...updatedTask,
    });
    return task;
  }

  async delete(id: string) {
    return await db.delete(`/tasks/${id}`);
  }
}

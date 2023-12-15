import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { db } from '../helpers/dataBase';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TasksRepository {
  async findAll() {
    const tasks = await db.getData('/tasks');
    return tasks;
  }
  async find(key: string) {
    return await db.find<Tasks>(`/tasks`, (task: Tasks) => task.id === key);
  }

  async findOne(key: string) {
    return await db.getData(`/tasks[${key}]`);
  }

  async create(task: Tasks) {
    const key = uuidv4();
    await db.push(`/tasks[]`, {
      ...task,
      id: key,
    });
    return task;
  }
  async update(id: string, updatedTask: UpdateTaskDto) {
    const Originaltask = await db.getData(`/tasks[${id}]`);

    await db.push(
      `/tasks[${id}]`,
      {
        ...Originaltask,
        ...updatedTask,
      },
      false,
    );
    return updatedTask;
  }

  async delete(id: string) {
    return await db.delete(`/tasks[${id}]`);
  }
}

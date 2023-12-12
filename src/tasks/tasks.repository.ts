import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { db } from 'src/main';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TasksRepository {
  async findAll() {
    return await db.getData('/tasks');
  }

  async findOne(key: string) {
    const position = await db.getIndex(`/tasks`, key);
    return await db.getData(`/tasks[${position}]`);
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
    const position = await db.getIndex(`/tasks`, id);
    const Originaltask = await db.getData(`/tasks[${position}]`);

    await db.push(
      `/tasks[${position}]`,
      {
        ...Originaltask,
        ...updatedTask,
      },
      false,
    );
    return updatedTask;
  }

  async delete(id: string) {
    const position = await db.getIndex(`/tasks`, id);
    return await db.delete(`/tasks[${position}]`);
  }
}

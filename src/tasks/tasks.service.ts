import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks = new JsonDB(new Config('tasks', true, false, '/'));

  async findAll() {
    return await this.tasks.getData('/');
  }

  async findOne(key: string) {
    return await this.tasks.getData(`/${key}`);
  }

  async create(task) {
    const key = uuidv4();
    return await this.tasks.push(`/${key}`, task);
  }

  async delete(id) {
    return await this.tasks.delete(`/${id}`);
  }
}

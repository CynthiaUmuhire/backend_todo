import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  private categories = new JsonDB(new Config('categories', true, false, '/'));

  async findAll() {
    return this.categories.getData('/categories');
  }

  async create(category: CreateCategoryDto) {
    const categoryKey = uuid();
    this.categories.push(`/${categoryKey}`, { ...category, id: categoryKey });
  }
}

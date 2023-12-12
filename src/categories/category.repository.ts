import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';
import { db } from 'src/main';

@Injectable()
export class CategoryRepository {
  async findAll() {
    return await db.getData('/categories');
  }

  async create(category: CreateCategoryDto) {
    const categoryKey = uuid();
    db.push(`/categories[]`, { ...category, id: categoryKey });
  }
}

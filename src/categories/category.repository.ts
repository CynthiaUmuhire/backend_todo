import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';
import { db } from '../helpers/dataBase';

@Injectable()
export class CategoryRepository {
  async findAll() {
    return await db.getData('/categories');
  }

  async create(category: CreateCategoryDto) {
    const categoryKey = uuid();
    await db.push(`/categories[]`, { ...category, id: categoryKey });
    return category;
  }

  async delete(id: string) {
    try {
      const position = await db.getIndex(`/categories`, id);
      await db.delete(`/categories[${position}]`);
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }
}

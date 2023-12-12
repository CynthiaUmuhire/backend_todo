import { ConflictException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';
import { db } from 'src/main';

@Injectable()
export class CategoriesService {
  async findAll() {
    return await db.getData('/categories');
  }

  async create(category: CreateCategoryDto) {
    const categoryKey = uuid();
    const categories = await db.getData('/categories');

    const existingCategory = Object.entries(categories)
      .flat(Infinity)
      .some((item: any) => item.name === category.name);
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    db.push(`/categories/${categoryKey}`, { ...category, id: categoryKey });
  }
}

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { db } from '../helpers/dataBase';
import { Tasks } from 'src/tasks/entities/tasks.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(forwardRef(() => CategoryRepository))
    private categoryRepository: CategoryRepository,
  ) {}
  async findAll() {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(category: CreateCategoryDto) {
    try {
      const categoryPosition = await db.getIndex(
        `/categories`,
        category.categoryName,
        'categoryName',
      );

      if (categoryPosition !== -1)
        throw new ConflictException(
          'Category with the specified name already exists',
        );
      return await this.categoryRepository.create(category);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  async delete(id: string) {
    const exists = await db.getIndex(`/categories`, id);

    if (exists === -1)
      throw new NotFoundException(
        'Category with the specified id is not found',
      );

    const tasks = await db.getData(`/tasks`);
    const usedCategories = tasks.filter(
      (task: Tasks) => task.categoryId === id,
    );
    if (usedCategories.length < 1)
      throw new ConflictException(
        'Category is in use, please delete all tasks in this category first',
      );
    return await this.categoryRepository.delete(id);
  }
}

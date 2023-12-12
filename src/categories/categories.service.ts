import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { db } from 'src/main';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
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
      console.log(categoryPosition);
      if (categoryPosition !== -1)
        throw new ConflictException(
          'Category with the specified name already exists',
        );
      return await this.categoryRepository.create(category);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}

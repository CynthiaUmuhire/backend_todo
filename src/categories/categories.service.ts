import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async findAll() {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      throw new NotFoundException('Categories not found');
    }
  }

  async create(category: CreateCategoryDto) {
    try {
      return await this.categoryRepository.create(category);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  forwardRef,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
  ) {}
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}

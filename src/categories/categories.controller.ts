import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    return 'This action returns all categories';
  }
  @Post()
  create(@Body() body) {
    return `This action adds a new category with name ${body.name} `;
  }
}

import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  findAll(): string {
    return 'This action returns all tasks';
  }

  @Get(':id')
  findOne(id: string) {
    return `This action returns a #${id} task`;
  }

  @Post()
  create(@Body() body: any) {
    return 'This action adds a new task = ' + body;
  }

  @Delete(':id')
  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}

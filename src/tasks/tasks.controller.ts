import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  findAll(): string {
    return 'This action returns all tasks';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} task`;
  }

  @Post()
  create(@Body() body: any) {
    return `This action adds a new task with name!!!!! ${body.name} `;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} task`;
  }
}

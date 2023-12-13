import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  forwardRef,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(id, body);
  }
}

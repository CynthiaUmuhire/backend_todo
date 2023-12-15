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
import { Tasks } from './entities/tasks.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<Tasks> {
    return await this.tasksService.create(body);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.delete(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return await this.tasksService.update(id, body);
  }
}

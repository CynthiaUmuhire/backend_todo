import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../entities/tasks.entity';
import { IsEnum, MinLength } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  @MinLength(1)
  readonly status: TaskStatus;
}

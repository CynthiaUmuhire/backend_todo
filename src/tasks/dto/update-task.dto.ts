import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../entities/tasks.entity';
import { IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  @MinLength(1)
  @ApiProperty({
    description: 'The task status',
    default: 'OPEN',
    example: 'IN_PROGRESS',
    required: true,
    enum: TaskStatus,
  })
  readonly status: TaskStatus;
}

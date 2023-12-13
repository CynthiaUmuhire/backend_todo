import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  readonly id: string;
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The task title',
    default: 'This is a task title',
    example: 'Learn NestJS',
    required: true,
  })
  readonly title: string;
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The task description',
    default: 'This is a task description',
    example: 'Learn NestJS about controllers and services',
    required: true,
  })
  readonly description: string;
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The category description',
    default: 'This is a category description',
    example: 'Studies',
    required: true,
  })
  category: string;
}

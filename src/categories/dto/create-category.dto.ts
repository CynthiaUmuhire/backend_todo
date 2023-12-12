import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class CreateCategoryDto {
  id: string;
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The category description',
    default: 'This is a category description',
    example: 'Studies',
    required: true,
  })
  categoryName: string;
  tasks: CreateTaskDto[];
}

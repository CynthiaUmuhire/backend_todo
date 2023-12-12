import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

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
  name: string;
}

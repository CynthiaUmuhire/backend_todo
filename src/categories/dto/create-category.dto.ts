import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  id: string;
  @IsString()
  @MinLength(1)
  categoryName: string;
}

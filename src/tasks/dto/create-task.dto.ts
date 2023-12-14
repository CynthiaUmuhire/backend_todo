import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  readonly id: string;
  @IsString()
  @MinLength(1)
  readonly title: string;
  @IsString()
  @MinLength(1)
  readonly description: string;
  @IsString()
  @MinLength(1)
  category: string;
}

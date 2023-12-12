import { IsString } from 'class-validator';

export class CreateTaskDto {
  readonly id: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
}

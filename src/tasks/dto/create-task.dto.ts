import { IsString } from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';

export class CreateTaskDto {
  readonly id: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly status: TaskStatus;
}

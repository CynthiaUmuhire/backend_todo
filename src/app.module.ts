import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TasksModule, CategoriesModule],
})
export class AppModule {}

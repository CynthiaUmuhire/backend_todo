import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TasksModule, CategoriesModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}

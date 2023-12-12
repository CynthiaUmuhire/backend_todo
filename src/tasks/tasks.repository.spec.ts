import { TasksRepository } from './tasks.repository';

describe('TasksRepository', () => {
  it('should be defined', () => {
    expect(new TasksRepository()).toBeDefined();
  });
});

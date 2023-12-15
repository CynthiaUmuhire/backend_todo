import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const fakeService: Partial<CategoriesService> = {
    findAll: () =>
      Promise.resolve([
        {
          id: '1',
          name: 'Category 1',
        },
      ]),
    create: () =>
      Promise.resolve({
        id: '1',
        categoryName: 'Category 1',
        name: 'Category 1',
      }),
    delete: () =>
      Promise.resolve({
        message: 'Category deleted successfully',
      }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: fakeService }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = await controller.findAll();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });
  });
  describe('create', () => {
    it('should return a category object', async () => {
      const category = await controller.create({
        id: '1',
        categoryName: 'Category 1',
      });
      expect(category).toBeDefined();
      expect(category.id).toBe('1');
      expect(category.categoryName).toBe('Category 1');
    });
  });
  describe('delete', () => {
    it('should return a message', async () => {
      const message = await controller.delete('1');
      expect(message).toBeDefined();
      expect(message.message).toBe('Category deleted successfully');
    });
  });
});

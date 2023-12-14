import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from './category.repository';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const fakeRepository: Partial<CategoryRepository> = {
    create: (category: CreateCategoryDto) =>
      Promise.resolve({
        id: category.id,
        categoryName: category.categoryName,
      }),
    findAll: () =>
      Promise.resolve([
        {
          id: '1',
          name: 'Category 1',
        },
      ]),
    delete: () => Promise.resolve({ message: 'Category deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoryRepository,
          useValue: fakeRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = await service.findAll();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should return an empty array when there is no category', async () => {
      jest.spyOn(fakeRepository, 'findAll').mockResolvedValueOnce([]);
      const categories = await service.findAll();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return a category object', async () => {
      const category = await service.create({
        id: '54470841-4db9-447f-81f9-4f1fee642f5b',
        categoryName: 'Dancing',
      });
      expect(category.id).toEqual('54470841-4db9-447f-81f9-4f1fee642f5b');
    });
  });

  describe('delete', () => {
    it('should return a 404 ERROR response when no category with the specified id is found', async () => {
      jest.spyOn(fakeRepository, 'delete').mockResolvedValueOnce(null);
      try {
        await service.delete('123');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

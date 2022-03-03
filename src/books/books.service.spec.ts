import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';

describe('Books', () => {
  let provider: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    provider = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

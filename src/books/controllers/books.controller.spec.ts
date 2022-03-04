import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/books.service';
import { BooksController } from './books.controller';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService,
        {
          provide: BooksService,
          useValue: {
            getBooks: jest.fn(),
            findOne: jest.fn(),
            createBook: jest.fn(),
            putBook: jest.fn(),
            deleteBook: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

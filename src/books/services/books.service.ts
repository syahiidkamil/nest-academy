import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(filterBookDto: FilterBookDto): Promise<BookEntity[]> {
    let filter: FindConditions<BookEntity> = {};
    if (filterBookDto.title) {
      filter = { title: filterBookDto.title };
    }
    const books = await this.bookRepository.find(filter);

    return books;
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }

  async createBook(bookData: BookDto): Promise<BookEntity> {
    const bookEntity = this.bookRepository.create(bookData);
    return this.bookRepository.save(bookEntity);
  }

  async putBook(bookId: string, bookData: BookDto): Promise<BookEntity> {
    await this.bookRepository.delete(bookId);
    return this.bookRepository.save({ id: Number(bookId), ...bookData });
  }

  async deleteBook(bookId: string): Promise<string> {
    await this.bookRepository.delete(bookId);
    return `Book with id:${bookId} has been successfully deleted`;
  }
}

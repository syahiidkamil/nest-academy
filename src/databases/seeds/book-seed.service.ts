import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import * as bookSeedList from './book-seed-list.json';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async saveBook(bookSeed): Promise<void> {
    const bookEntity = this.bookRepository.create(bookSeed)
    await this.bookRepository.save(bookEntity);
  }

  async seed(): Promise<void> {
    for (let index = 0; index < bookSeedList.length; index++) {
      const bookSeed = bookSeedList[index];
      await this.saveBook(bookSeed)
    }
  }
}

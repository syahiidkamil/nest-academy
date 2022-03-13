import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from 'src/books/dtos/create.book.dto';
import { SeedBookDto } from 'src/books/dtos/seed.book';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import * as bookSeedList from './book-seed-list.json';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookDetailEntity)
    private bookDetailRepository: Repository<BookDetailEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>
  ) {}

  private async saveBookDetail(): Promise<BookDetailEntity> {
    const bookDetailSeed = {
      price: `${1000 + Math.floor(Math.random() * 10000)}`,
      quantity: `${Math.floor(Math.random() * 20)}`
    }
    const bookDetailEntity = this.bookDetailRepository.create(bookDetailSeed)
    await this.bookDetailRepository.save(bookDetailEntity);
    return bookDetailEntity;
  }

  async updateBookDetail(bookDetailId: number, bookEntity: BookEntity): Promise<void> {
    await this.bookDetailRepository.update(bookDetailId, {profile: bookEntity});
  }

  async saveBookAndDetail(bookSeed: SeedBookDto): Promise<void> {
    const bookDetailEntity = await this.saveBookDetail();
    console.log('bookDetailEntity', bookDetailEntity);
    const bookEntity = await this.bookRepository.save({...bookSeed, book: bookDetailEntity });
    await this.updateBookDetail(bookDetailEntity.id, bookEntity)
  }

  async seed(): Promise<void> {
    for (let index = 0; index < bookSeedList.length; index++) {
      const bookSeed = bookSeedList[index];
      await this.saveBookAndDetail(bookSeed)
    }
  }
}

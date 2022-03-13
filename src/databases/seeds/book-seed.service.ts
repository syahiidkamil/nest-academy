import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeedBookDto } from 'src/books/dtos/seed.book';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import * as bookSeedList from './book-seed-list.json';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(BookDetailEntity)
    private bookDetailRepository: Repository<BookDetailEntity>
  ) {}

  async saveBookDetail(profileId): Promise<void> {
    const bookDetailSeed = {
      profileId,
      profile: profileId,
      price: `${1000 + Math.floor(Math.random()) * 10000}`,
      quantity: `${Math.floor(Math.random()) * 20}`
    }
    const bookDetailEntity = this.bookDetailRepository.create(bookDetailSeed)
    await this.bookDetailRepository.save(bookDetailEntity);
  }

  async saveBookAndDetail(bookSeed: SeedBookDto): Promise<void> {
    const bookEntity = this.bookRepository.create(bookSeed)
    await this.bookRepository.save(bookEntity);
    await this.saveBookDetail(bookEntity.id);
  }

  async seed(): Promise<void> {
    for (let index = 0; index < bookSeedList.length; index++) {
      const bookSeed = bookSeedList[index];
      await this.saveBookAndDetail(bookSeed)
    }
  }
}

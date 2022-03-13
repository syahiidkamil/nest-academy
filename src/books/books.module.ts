import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './controllers/books.controller';
import { BookDetailEntity } from './entities/book-detail.entity';
import { BookEntity } from './entities/book.entity';
import { BooksService } from './services/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, BookDetailEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

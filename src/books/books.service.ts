import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getBooks(): string {
    const books = 'books-from-service'

    return books;
  }
}

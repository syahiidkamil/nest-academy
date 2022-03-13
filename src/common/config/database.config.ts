import { registerAs } from '@nestjs/config';
import { BookDetailEntity } from '../../books/entities/book-detail.entity';
import { BookEntity } from '../../books/entities/book.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncronize: false,
  entities: [BookEntity, BookDetailEntity],
}));

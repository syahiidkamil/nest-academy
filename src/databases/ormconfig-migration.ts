import { BookDetailEntity } from '../books/entities/book-detail.entity';
import { BookEntity } from '../books/entities/book.entity';
import databaseConfig from '../common/config/database.config';

module.exports = {
  host: databaseConfig().host,
  type: 'mysql',
  port: databaseConfig().port,
  username: databaseConfig().username,
  password: databaseConfig().password,
  database: databaseConfig().database,
  syncronize: false,
  entities: [BookEntity, BookDetailEntity],
  migrations: ['src/databases/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/databases/migrations',
  },
};

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'datashare',
  password: process.env.DB_PASSWORD || 'datashare123',
  database: process.env.DB_NAME || 'datashare',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development', // WARNING: Set to false in production
  logging: process.env.NODE_ENV === 'development',
});

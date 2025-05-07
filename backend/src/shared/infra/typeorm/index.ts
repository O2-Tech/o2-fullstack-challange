import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/modules/**/infra/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['src/shared/infra/typeorm/migrations/*{.ts,.js}'],
});

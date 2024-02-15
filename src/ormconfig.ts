import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: '0.0.0.0',
  port: +process.env.DB_PORT,
  username: 'postgres',
  password: 'postgres',
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
};

export default config;

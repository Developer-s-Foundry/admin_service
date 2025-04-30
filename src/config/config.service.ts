import * as dotenv from 'dotenv';
dotenv.config();
import { Admin }  from '../database/entities/admin.entity';
import { Migration } from 'typeorm';

export const configs = () => ({
  PORT: {
    APP_PORT: process.env.PORT,
  },
  JWT_TOKEN: {
    JWT_SECRET: process.env.JWT_SECRET,
    // REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
    JWT_ISSUER: process.env.JWT_ISSUER
  },
  database: {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT ),
    username:process.env.PG_USERNAME,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE,
   // entities: process.env.NODE_ENV === 'production' ? ["dist/**/*.entity{.ts,.js}"] : ['./database/entities/*.ts'],
    entities: [Admin],
    migrations: ['./src/database/migrations/*.ts']
    //migrations: process.env.NODE_ENV === 'production' ? ["dist/migrations/*{.ts,.js}"] : ['./database/migrations/*.ts'], 
   //url: process.env.DB_URL,
  },

  log: {
    level: process.env.LOG_LEVEL || 'info',  // Make sure to add a default log level if not provided
  },

  isProduction: process.env.NODE_ENV === 'production', 
});

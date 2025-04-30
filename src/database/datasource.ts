import { configs } from "../config/config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { Admin } from "./entities/admin.entity";


export const dataSourceOptions: DataSourceOptions ={
    type: "postgres",
    host: configs().database.host,
    port: configs().database.port,
    username: configs().database.username,
    password: configs().database.password,
    database: configs().database.database,
    entities: configs().database.entities,
    migrations: configs().database.migrations,
    // entities: ["dist/**/*.entity{.ts,.js}"],
    // migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: false,
    logging: true,
    // ssl: {
    //     rejectUnauthorized: false, // Example: Useful in some environments like Heroku
    //   },
    ssl: process.env.isProduction ? { rejectUnauthorized: false } : false
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

export const postgresLoader = async () => {
    try {
      const conn = await dataSource.initialize();
      console.log('✅ Connected to PostgreSQL database');
      return conn;
    } catch (err) {
      console.error(`❌ Database connection error: ${err}`);
      console.log(configs().database);
      throw err;
    }
  };
  
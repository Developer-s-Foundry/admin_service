import { config } from "src/config/config.service";
import { DataSource, DataSourceOptions } from "typeorm";


export const dataSourceOptions: DataSourceOptions ={
    type: "postgres",
    host: config().database.host,
    port: config().database.port,
    username: config().database.username,
    password: config().database.password,
    database: config().database.database,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
    logging: true,
    ssl: {
        rejectUnauthorized: false, // Example: Useful in some environments like Heroku
      },
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
      throw err;
    }
  };
  
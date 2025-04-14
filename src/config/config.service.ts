import * as dotenv from 'dotenv';
dotenv.config();

export const config = () => ({
  PORT: {
    APP_PORT: process.env.PORT,
  },

  database: {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT ),
    username:process.env.PG_USERNAME,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE    
    //url: process.env.DB_URL,
  },

  log: {
    level: process.env.LOG_LEVEL || 'info',  // Make sure to add a default log level if not provided
  },

  isProduction: process.env.NODE_ENV === 'production', 
});

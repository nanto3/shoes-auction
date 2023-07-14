import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const envConfig = {
  env: process.env.ENV,
  
  port: process.env.PRODUCT_PORT || 3030,

  database: process.env.PRODUCT_MYSQL_DB,
  username: process.env.PRODUCT_MYSQL_DB_USER,
  password: process.env.PRODUCT_MYSQL_DB_PASSWORD,
  host: process.env.PRODUCT_MYSQL_DB_HOST,
  dbPort: process.env.PRODUCT_MYSQL_DB_PORT,
};

export default envConfig;

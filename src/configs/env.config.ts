import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const envConfig = {
  env: process.env.ENV,
  
  port: process.env.SHOES_AUCTION_PORT || 3030,

  database: process.env.SHOES_AUCTION_MYSQL_DB,
  username: process.env.SHOES_AUCTION_MYSQL_DB_USER,
  password: process.env.SHOES_AUCTION_MYSQL_DB_PASSWORD,
  host: process.env.SHOES_AUCTION_MYSQL_DB_HOST,
  dbPort: process.env.SHOES_AUCTION_MYSQL_DB_PORT,

  passwordSalt: process.env.SHOES_AUCTION_PASSWORD_SALT,
};

export default envConfig;

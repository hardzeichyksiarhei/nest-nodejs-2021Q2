import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
const AUTHOR: string = process.env.AUTHOR || 'hardz';

// application
const PORT: number = parseInt(process.env.PORT, 10) || 4000;

// jsonwebtoken
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'secret-key';

// auth
const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';

// database
const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '4804';
const POSTGRES_DB = process.env.POSTGRES_DB || 'trello';

export {
  NODE_ENV,
  AUTHOR,
  PORT,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};

import { Pool } from 'pg';
import { config } from 'dotenv';
import debug from 'debug';

const logger = debug(process.env.NODE_ENV === 'TEST'
  ? 'banka_tests_db' : 'banka_db');

config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'TEST'
    ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL,
});

pool.on('connect', (err) => {
  logger('connected to the db');
  if (err) {
    logger('Error:', err);
  }
});

export { pool, logger };

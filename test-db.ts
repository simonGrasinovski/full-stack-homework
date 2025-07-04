// This file is used to test database connections in the test environment
import { Pool } from 'pg';

const testDbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'test_db',
  user: 'test_user',
  password: 'test_password',
};

const pool = new Pool(testDbConfig);

export default pool;
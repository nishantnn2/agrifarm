import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'nishant',
  database: process.env.DB_NAME || 'agrifarm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection and setup database
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected: Connected to database');
    connection.release();

    // Create tables if they don't exist
    await setupDatabase();
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    console.log('\n⚠️  Note: Server will start but database features will not work.');
    console.log('Please configure MySQL connection in .env file or use MongoDB Atlas.\n');
  }
};

// Setup database schema
const setupDatabase = async () => {
  try {
    const sqlPath = join(__dirname, 'schema.sql');
    const sql = readFileSync(sqlPath, 'utf8');
    
    // Split by semicolon to get individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim() !== '');
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }
    
    console.log('Database schema initialized');
  } catch (error) {
    // If tables already exist, that's fine
    if (error.code !== 'ER_TABLE_EXISTS_ERROR' && error.code !== 'ER_DB_CREATE_EXISTS') {
      console.log('Database setup info:', error.message);
    }
  }
};

export { pool, connectDB };


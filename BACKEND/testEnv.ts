import dotenv from 'dotenv';

dotenv.config();

console.log('Database name:', process.env.DB_NAME);
console.log('Database user:', process.env.DB_USER);

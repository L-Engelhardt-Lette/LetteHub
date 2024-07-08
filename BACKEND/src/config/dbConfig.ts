import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: '',
    password: '',
    database: 'project_management',
});

export default db;

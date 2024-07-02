import mysql from 'mysql';

// MySQL-Datenbankverbindung konfigurieren
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'user_info',
});

// Verbindung herstellen
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

export default db;

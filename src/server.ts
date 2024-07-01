import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Registrierungsroute
app.post('/register', (req, res) => {
  const { name, vorname, email, password } = req.body;
  
  const sql = 'INSERT INTO users (name, vorname, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, vorname, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('User registered successfully');
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

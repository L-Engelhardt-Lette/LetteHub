import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './utils/database';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.use(express.json());

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Sync DB models
sequelize.sync({ alter: true });

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './utils/database';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes'

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

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
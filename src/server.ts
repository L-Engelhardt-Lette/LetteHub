import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import sequelize from './utils/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

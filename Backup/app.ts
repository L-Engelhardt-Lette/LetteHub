import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from '../BACKEND/src/routes/authRoutes';
import projectRoutes from '../BACKEND/src/routes/projectRoutes';
import taskRoutes from '../BACKEND/src/routes/taskRoutes';

// Importing models to ensure they are registered with Sequelize
import User from '../BACKEND/src/models/User';
import Project from '../BACKEND/src/models/Project';
import Task from '../BACKEND/src/models/Task';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }) // Use { force: true } to drop and recreate tables (caution: this deletes data)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

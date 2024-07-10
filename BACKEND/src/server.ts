import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbConfig';
import userRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

// Importing models to ensure they are registered with Sequelize
import User from './models/User';
import Project from './models/project';
import Task from './models/Task';

dotenv.config({ path: './.env'});


console.log('Database name:', process.env.DB_NAME);
console.log('Database user:', process.env.DB_USER);

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

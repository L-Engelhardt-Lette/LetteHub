import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbConfig'; // Adjust the path as necessary
import User from './models/User'; // Adjust the path as necessary
import Project from './models/project'; // Adjust the path as necessary
import Task from './models/Task'; // Adjust the path as necessary
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use(express.json());

// Define your routes here
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

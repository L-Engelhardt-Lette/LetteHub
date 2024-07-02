import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'your_database_name',  // Replace with your database name
  process.env.MYSQL_USER || 'your_database_user',      // Replace with your database user
  process.env.MYSQL_PASSWORD || 'your_database_password',  // Replace with your database password
  {
    host: process.env.MYSQL_HOST || 'localhost',       // Replace with your database host
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
import User from './User';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number;
}

Task.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING(256),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'tasks',
  sequelize,
});

// Define the relationship
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

export default Task;

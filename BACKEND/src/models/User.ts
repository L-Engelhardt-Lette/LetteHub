import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
//import Task from './Task';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'users',
  sequelize,
});

export default User;

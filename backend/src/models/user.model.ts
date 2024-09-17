import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database"; // Adjust the path to your database instance

// Define the attributes interface
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

// Optional fields for creation
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role"> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> {
  static id: any;
  static password: any;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize, // Sequelize instance
    tableName: "users",
    // Sequelize will automatically manage `createdAt` and `updatedAt`
  }
);

export default User;

import { DataTypes, Model } from "sequelize";
import sequelize from "../../../backend/src/database";
import User from "./user.model";

class Project extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public userId!: number;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Project",
  }
);

export default Project;

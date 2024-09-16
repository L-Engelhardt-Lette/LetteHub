import { DataTypes, Model } from "sequelize";
import sequelize from "../../../backend/src/database";
import Project from "./project.model";

class Task extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public projectId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

export default Task;

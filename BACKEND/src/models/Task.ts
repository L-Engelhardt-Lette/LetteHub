import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public projectId!: number;
    public userId!: number; // New field for user assignment
    public startDate!: Date; // New field for start date
    public dueDate!: Date; // New field for due date
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        projectId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true, // Allow null because a task might not be assigned initially
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Task',
    }
);

export default Task;

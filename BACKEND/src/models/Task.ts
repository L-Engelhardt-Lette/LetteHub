import { DataTypes, Model } from 'sequelize';
import  sequelize  from '../config/dbConfig';

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public projectId!: number;
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
    },
    {
        sequelize,
        modelName: 'Task',
    }
);

export default Task;

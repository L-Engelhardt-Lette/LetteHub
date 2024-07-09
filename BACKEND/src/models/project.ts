import { DataTypes, Model } from 'sequelize';
import  sequelize  from '../config/dbConfig';

class Project extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Project',
    }
);

export default Project;

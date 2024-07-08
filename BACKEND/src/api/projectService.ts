const baseUrl = "http://localhost:5000/api";
import db from '../config/dbConfig';

interface Project {
    userId: number;
    projectName: string;
    projectData: string;
}

export const createProject = async (project: Project) => {
    const [result] = await db.execute(
        'INSERT INTO projects (user_id, project_name, project_data) VALUES (?, ?, ?)',
        [project.userId, project.projectName, project.projectData]
    );
    return result;
};

export const getProjectsByUserId = async (userId: number) => {
    const [rows] = await db.execute(
        'SELECT * FROM projects WHERE user_id = ?',
        [userId]
    );
    return rows;
};


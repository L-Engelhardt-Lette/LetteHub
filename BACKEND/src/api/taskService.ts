const baseUrl = "http://localhost:5000/api";
import db from '../config/dbConfig';

interface Task {
    projectId: number;
    taskName: string;
    taskData: string;
}

export const createTask = async (task: Task) => {
    const [result] = await db.execute(
        'INSERT INTO tasks (project_id, task_name, task_data) VALUES (?, ?, ?)',
        [task.projectId, task.taskName, task.taskData]
    );
    return result;
};

export const getTasksByProjectId = async (projectId: number) => {
    const [rows] = await db.execute(
        'SELECT * FROM tasks WHERE project_id = ?',
        [projectId]
    );
    return rows;
};


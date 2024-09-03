import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDatabase() {
  db = await open({
    filename: "./lettedb.db",
    driver: sqlite3.Database,
  });

  // Create tables if they don't exist
  await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        );

        CREATE TABLE IF NOT EXISTS projects (
            project_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            start_date TEXT,
            end_date TEXT,
            columns_count INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS project_users (
            project_id TEXT,
            user_id TEXT,
            PRIMARY KEY (project_id, user_id),
            FOREIGN KEY (project_id) REFERENCES projects(project_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );

        CREATE TABLE IF NOT EXISTS columns (
            column_id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id TEXT,
            name TEXT NOT NULL,
            color TEXT,
            position INTEGER,
            FOREIGN KEY (project_id) REFERENCES projects(project_id)
        );

        CREATE TABLE IF NOT EXISTS tasks (
            task_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            project_id TEXT,
            column_id INTEGER,
            description TEXT,
            status TEXT,
            progress INTEGER,
            start_date TEXT,
            end_date TEXT,
            position INTEGER,
            FOREIGN KEY (project_id) REFERENCES projects(project_id),
            FOREIGN KEY (column_id) REFERENCES columns(column_id)
        );

        CREATE TABLE IF NOT EXISTS task_users (
            task_id TEXT,
            user_id TEXT,
            PRIMARY KEY (task_id, user_id),
            FOREIGN KEY (task_id) REFERENCES tasks(task_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );

        CREATE TRIGGER IF NOT EXISTS after_project_insert
        AFTER INSERT ON projects
        FOR EACH ROW
        BEGIN
            INSERT INTO columns (project_id, name, color, position) 
            VALUES (NEW.project_id, 'Backlog', '#FF5733', 0),
                   (NEW.project_id, 'TODO', '#33FF57', 1),
                   (NEW.project_id, 'In Progress', '#3357FF', 2),
                   (NEW.project_id, 'Complete', '#FFD700', 3);

            UPDATE projects SET columns_count = 4 WHERE project_id = NEW.project_id;
        END;
    `);
}

export async function getDatabase() {
  if (!db) {
    await initDatabase();
  }
  return db;
}

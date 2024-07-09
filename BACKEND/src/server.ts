import express, { Request, Response } from "express";
import mysql, { QueryError, FieldPacket } from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lettehubdb",
});

db.connect((err: QueryError | null) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// API endpoints
app.get("/api/tasks", (req: Request, res: Response) => {
  db.query(
    "SELECT * FROM tasks",
    (err: QueryError | null, results: any, fields: FieldPacket[]) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    }
  );
});

app.post("/api/tasks", (req: Request, res: Response) => {
  const task = req.body;
  db.query(
    "INSERT INTO tasks SET ?",
    task,
    (err: QueryError | null, results: any, fields: FieldPacket[]) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ id: results.insertId, ...task });
    }
  );
});

app.put("/api/tasks/:id", (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  db.query(
    "UPDATE tasks SET ? WHERE task_id = ?",
    [updatedTask, taskId],
    (err: QueryError | null, results: any, fields: FieldPacket[]) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ id: taskId, ...updatedTask });
    }
  );
});

app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const taskId = req.params.id;
  db.query(
    "DELETE FROM tasks WHERE task_id = ?",
    taskId,
    (err: QueryError | null, results: any, fields: FieldPacket[]) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(204).end();
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

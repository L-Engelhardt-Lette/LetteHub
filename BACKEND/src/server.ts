import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import sequelize from "./config/dbConfig";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Session Middleware Configuration
app.use(
  session({
    secret: "your-secret-key", // Use a strong secret key in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// CORS Middleware Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true, // Enable credentials if your frontend requires them
  })
);

app.options("*", cors()); // Respond to preflight requests

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Check login status endpoint
app.get("/api/check-login", (req: Request, res: Response) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Login endpoint
app.post("/api/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simulate user authentication (replace with your own logic)
  if (email === "user@example.com" && password === "password123") {
    req.session.user = { email }; // Store user info in session
    res.json({ message: "Login successful", token: "dummy-token" });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// Register endpoint
app.post("/api/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Simulate user registration (replace with your own logic)
    // For example, you can save the user data to your database
    // Here we just send a success response

    // Save the user to the database (pseudo code)
    // await User.create({ name, email, password });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
});

// Project endpoints
let projectCounter = 1;
let projects: {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: string[];
}[] = [];

app.get("/api/projects", (req: Request, res: Response) => {
  res.json(projects);
});

app.post("/api/projects", (req: Request, res: Response) => {
  const { name, description, startDate, endDate, participants } = req.body;
  const newProject = {
    id: projectCounter.toString(),
    name,
    description,
    startDate,
    endDate,
    participants,
  };
  projectCounter++;
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put("/api/projects/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, participants } = req.body;
  const project = projects.find((p) => p.id === id);
  if (project) {
    project.name = name;
    project.description = description;
    project.startDate = startDate;
    project.endDate = endDate;
    project.participants = participants;
    res.status(200).json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

app.delete("/api/projects/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  projects = projects.filter((project) => project.id !== id);
  res.status(200).json({ message: "Project deleted successfully" });
});

// Task endpoints
let taskCounter = 1;
let tasks: {
  task_id: number;
  task_name: string;
  projectID: string;
  description: string;
  persons: string[];
  status: number;
  progress: number;
  startDate: string;
  finishDate: string;
  column: string;
}[] = [];

app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.post("/api/tasks", (req: Request, res: Response) => {
  const {
    task_name,
    projectID,
    description,
    persons,
    status,
    progress,
    startDate,
    finishDate,
    column,
  } = req.body;
  const newTask = {
    task_id: taskCounter,
    task_name,
    projectID,
    description,
    persons,
    status,
    progress,
    startDate,
    finishDate,
    column,
  };
  taskCounter++;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    task_name,
    projectID,
    description,
    persons,
    status,
    progress,
    startDate,
    finishDate,
    column,
  } = req.body;
  const task = tasks.find((t) => t.task_id === parseInt(id));
  if (task) {
    task.task_name = task_name;
    task.projectID = projectID;
    task.description = description;
    task.persons = persons;
    task.status = status;
    task.progress = progress;
    task.startDate = startDate;
    task.finishDate = finishDate;
    task.column = column;
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.task_id !== parseInt(id));
  res.status(200).json({ message: "Task deleted successfully" });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    await sequelize.sync({ force: false });
    console.log("Database synced successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

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

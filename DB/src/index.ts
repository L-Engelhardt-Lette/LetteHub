import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected"; // Import the protected routes

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/auth", authRoutes);
app.use("/api", protectedRoutes); // Use the protected routes

mongoose
  .connect("mongodb://mongo:27017/mydatabase")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

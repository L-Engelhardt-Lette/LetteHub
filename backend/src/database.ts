// src/database.ts
import { Sequelize } from "sequelize";
import path from "path";

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "lettedb.sqlite"), // Adjust path as needed
  logging: false,
});

export default sequelize;

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { getDatabase } from "../utils/database";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const db = await getDatabase();

  // Check if the email already exists
  const existingUser = await db.get(
    "SELECT * FROM users WHERE email = ?",
    email
  );
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate a unique user ID
  const userId = uuidv4();

  // Insert the new user into the database
  await db.run(
    "INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)",
    [userId, name, email, hashedPassword]
  );

  return { userId, name, email };
};

export const loginUser = async (email: string, password: string) => {
  const db = await getDatabase();

  // Retrieve the user by email
  const user = await db.get("SELECT * FROM users WHERE email = ?", email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    userId: user.user_id,
    name: user.name,
    email: user.email,
  };
};

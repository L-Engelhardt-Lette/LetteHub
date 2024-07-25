import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key"; // Use an environment variable for the secret key

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Token valid for 1 hour
};

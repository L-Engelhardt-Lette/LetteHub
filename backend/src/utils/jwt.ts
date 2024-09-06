import jwt from "jsonwebtoken";

// Secret key for signing the JWT
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Create a JWT token
export const createToken = (user: { id: string; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Verify the JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY); // This throws an error if invalid or expired
};

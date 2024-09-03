import jwt from "jsonwebtoken";

// Secret key used for signing the JWT
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Adjusted to accept only id and email, which might match your actual usage
export const createToken = (user: { id: string; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h", // Token expiration time
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

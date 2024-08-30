// backend/src/utils/auth.ts

import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "yourSecretKey";

export const generateToken = (user: { id: string; email: string }) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    secretKey,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
  return token;
};

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any; // Add `user` property to the Request type
}

const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
      (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user; // Attach the user to the request
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;

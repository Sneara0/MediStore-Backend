import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const generateToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

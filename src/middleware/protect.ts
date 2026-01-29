// src/middleware/protect.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

// ✅ Extend Request type to include `user`
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    // Add other fields from your Prisma User model if needed
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Runtime-checked JWT secret
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not defined" });
    }

 
    const decoded = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

  
    const user = await prisma.user.findUnique({
      where: { id: decoded.id as string },
      select: { id: true, email: true, role: true }, 
    });

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized", error });
  }
};

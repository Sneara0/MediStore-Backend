import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/prisma";

// ১️⃣ AuthRequest: Request এর extended version
export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

// ২️⃣ Protect middleware
export const protect: RequestHandler = async (req, res, next) => {
  try {
    // req কে cast করি AuthRequest হিসেবে
    const authReq = req as AuthRequest;

    const authHeader = authReq.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    // Token verify করা
    const decoded = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Database থেকে user খুঁজে বের করা
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // req.user set করা
    authReq.user = { id: user.id, email: user.email, role: user.role };

    // পরবর্তী middleware/callback কল করা
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

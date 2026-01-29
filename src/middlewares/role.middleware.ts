import { Request, Response, NextFunction } from "express";

// Allowed roles example: ["ADMIN"], ["CUSTOMER"], ["SELLER"]
export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
    }

    next();
  };

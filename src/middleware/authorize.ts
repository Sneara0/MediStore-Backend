import { Request, Response, NextFunction } from "express";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ message: "Access forbidden: insufficient permissions" });
      return;
    }

    next();
  };
};

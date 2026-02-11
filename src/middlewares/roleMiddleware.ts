import { Response, NextFunction } from "express";
import { RequestWithUser } from "./auth";

/**
 * Middleware to restrict access based on user roles.
 * Usage: roleMiddleware("ADMIN") or roleMiddleware("ADMIN", "SELLER")
 */
export const roleMiddleware =
  (...roles: ("CUSTOMER" | "SELLER" | "ADMIN")[]) =>
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    // 1. Check if user exists (set by 'protect' middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: No user found in request" 
      });
    }

    // 2. Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied: ${req.user.role} role is not permitted for this resource`,
      });
    }

    // 3. User is authorized, proceed to the controller
    next();
  };
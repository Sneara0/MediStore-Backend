import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔥 ERROR:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Custom Error
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Prisma Duplicate Error
  if (err.code === "P2002") {
    statusCode = 400;
    message = "Duplicate value already exists!";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

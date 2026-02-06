import { asyncHandler } from "../errors/asyncHandler.js";
import { ApiError } from "../errors/ApiError.js";
import {
  registerUserService,
  loginUserService,
} from "../services/authService";
import { Request, Response } from "express";

// ✅ Register API
export const registerUser = asyncHandler(async (req:Request, res:Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, Email, Password required!");
  }

  const user = await registerUserService(name, email, password, role);

  res.status(201).json({
    success: true,
    message: `${user.role} registered successfully ✅`,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ✅ Login API
export const loginUser = asyncHandler(async (req:Request, res:Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email & Password required!");
  }

  const { user, token } = await loginUserService(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful ✅",
    token,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

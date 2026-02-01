import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";


export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await registerUserService(name, email, password, role);
    res.status(201).json({ message: `${role} registered`, userId: user.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const { user, token } = await loginUserService(email, password);
    if (role && user.role !== role) return res.status(403).json({ error: "Role mismatch" });
    res.json({ message: "Login successful", token, role: user.role, userId: user.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

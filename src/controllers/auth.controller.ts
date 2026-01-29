import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { generateToken } from "../middlewares/auth.middleware";
import { Role } from "@prisma/client";

// ===== Register =====
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === "SELLER" ? Role.SELLER : Role.CUSTOMER,
      },
    });

    // generate token
    const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===== Login =====
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===== Get current user =====
export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ user });
};

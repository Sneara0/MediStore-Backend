import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type Role = "CUSTOMER" | "SELLER" | "ADMIN";
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const roles: Role[] = ["CUSTOMER", "SELLER"];
  if (!roles.includes(role)) throw new Error("Invalid role");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role }
  });

  

  return user;
};


export const loginUserService = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { user, token };
};

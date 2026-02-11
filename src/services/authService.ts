import { prisma } from "../config/prisma.js"; // অবশ্যই .js যোগ করবেন
import bcrypt from "bcryptjs"; // bcrypt বদলে bcryptjs ব্যবহার করুন
import jwt from "jsonwebtoken";

export type Role = "CUSTOMER" | "SELLER" | "ADMIN";

// ✅ Register Service
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const roles: Role[] = ["CUSTOMER", "SELLER"];
  if (!roles.includes(role)) throw new Error("Invalid role selection");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("This email is already registered!");

  // পাসওয়ার্ড হ্যাশ করা
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role }
  });

  return user;
};

// ✅ Login Service
export const loginUserService = async (
  email: string,
  password: string
) => {
  // ১. ইউজার খুঁজে দেখা
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  // ২. পাসওয়ার্ড চেক করা (অবশ্যই await দিবেন)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // ৩. JWT_SECRET চেক করা
  if (!process.env.JWT_SECRET) {
    throw new Error("Server Error: JWT_SECRET is not defined in .env");
  }

  // ৪. টোকেন তৈরি করা
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};
import { Request } from "express";

export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

export interface AuthUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser; // protect middleware set করে দিবে
}

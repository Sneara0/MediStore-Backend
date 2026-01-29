
import jwt, { SignOptions } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";


export const signToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as any };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};

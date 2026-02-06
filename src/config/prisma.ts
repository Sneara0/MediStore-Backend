import { PrismaClient } from "@prisma/client"; // Modern import
import dotenv from "dotenv";

dotenv.config();

export const prisma = new PrismaClient();

import pkg from "@prisma/client";

const PrismaPkg: any = pkg;   
export const prisma = new PrismaPkg.PrismaClient();

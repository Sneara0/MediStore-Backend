import prisma from "../config/prisma";
import bcrypt from "bcrypt";

export const getProfileService = async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, role: true } });
};

export const updateProfileService = async (userId: string, data: { name?: string; email?: string; password?: string }) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({ where: { id: userId }, data });
};

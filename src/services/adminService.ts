import { prisma } from "../config/prisma.js";

export const getAllUsersService = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const toggleBanUserService = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  return await prisma.user.update({
    where: { id: userId },
    data: { isBanned: !user.isBanned },
  });
};

export const getAllOrdersService = async () => {
  return await prisma.order.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      items: { include: { medicine: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const addCategoryService = async (name: string) => {
  return await prisma.category.create({ data: { name } });
};

export const deleteCategoryService = async (id: string) => {
  return await prisma.category.delete({ where: { id } });
};
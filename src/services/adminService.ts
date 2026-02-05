import {prisma} from "../config/prisma";

// Users
export const getAllUsersService = async () => {
  return prisma.user.findMany();
};

// Ban/Unban
export const toggleBanUserService = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return prisma.user.update({
    where: { id: userId },
    data: { isBanned: !user?.isBanned },
  });
};

// Orders
export const getAllOrdersService = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      items: { include: { medicine: true } },
    },
  });
};

// Category Add
export const addCategoryService = async (name: string) => {
  return prisma.category.create({ data: { name } });
};

// Category Delete
export const deleteCategoryService = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

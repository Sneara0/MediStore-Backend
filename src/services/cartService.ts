import {prisma} from "../config/prisma";

export const addToCartService = async (userId: string, medicineId: string, quantity: number) => {
  const existing = await prisma.cartItem.findFirst({ where: { userId, medicineId } });

  if (existing) {
    return await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return await prisma.cartItem.create({
    data: { userId, medicineId, quantity },
  });
};

export const getCartService = async (userId: string) => {
  return await prisma.cartItem.findMany({
    where: { userId },
    include: { medicine: true },
  });
};

export const removeFromCartService = async (cartItemId: string) => {
  return await prisma.cartItem.delete({ where: { id: cartItemId } });
};

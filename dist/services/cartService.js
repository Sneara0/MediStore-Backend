import { prisma } from "../config/prisma";
export const addToCartService = async (userId, medicineId, quantity) => {
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
export const getCartService = async (userId) => {
    return await prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
};
export const removeFromCartService = async (cartItemId) => {
    return await prisma.cartItem.delete({ where: { id: cartItemId } });
};
//# sourceMappingURL=cartService.js.map
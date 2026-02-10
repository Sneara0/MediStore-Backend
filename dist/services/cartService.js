"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCartService = exports.getCartService = exports.addToCartService = void 0;
const prisma_1 = require("../config/prisma");
const addToCartService = async (userId, medicineId, quantity) => {
    const existing = await prisma_1.prisma.cartItem.findFirst({ where: { userId, medicineId } });
    if (existing) {
        return await prisma_1.prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        });
    }
    return await prisma_1.prisma.cartItem.create({
        data: { userId, medicineId, quantity },
    });
};
exports.addToCartService = addToCartService;
const getCartService = async (userId) => {
    return await prisma_1.prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
};
exports.getCartService = getCartService;
const removeFromCartService = async (cartItemId) => {
    return await prisma_1.prisma.cartItem.delete({ where: { id: cartItemId } });
};
exports.removeFromCartService = removeFromCartService;

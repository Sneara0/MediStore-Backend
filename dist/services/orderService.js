"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByIdService = exports.getOrdersService = exports.placeOrderService = void 0;
const prisma_1 = require("../config/prisma");
// Place Order
const placeOrderService = async (userId, shippingAddress) => {
    const cartItems = await prisma_1.prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
    if (!cartItems.length)
        throw new Error("Cart is empty");
    const total = cartItems.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);
    const order = await prisma_1.prisma.order.create({
        data: {
            customerId: userId,
            total,
            shippingAddress,
            status: "PLACED",
            items: {
                create: cartItems.map((item) => ({
                    medicineId: item.medicineId,
                    quantity: item.quantity,
                    price: item.medicine.price,
                })),
            },
        },
        include: { items: { include: { medicine: true } } },
    });
    await prisma_1.prisma.cartItem.deleteMany({ where: { userId } });
    return order;
};
exports.placeOrderService = placeOrderService;
// Get all orders for a user
const getOrdersService = async (userId) => {
    return prisma_1.prisma.order.findMany({
        where: { customerId: userId },
        include: { items: { include: { medicine: true } } },
        orderBy: { createdAt: "desc" },
    });
};
exports.getOrdersService = getOrdersService;
// Get order by id
const getOrderByIdService = async (userId, orderId) => {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { medicine: true } } },
    });
    if (!order || order.customerId !== userId)
        throw new Error("Order not found");
    return order;
};
exports.getOrderByIdService = getOrderByIdService;

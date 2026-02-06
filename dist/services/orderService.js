import { prisma } from "../config/prisma";
// Place Order
export const placeOrderService = async (userId, shippingAddress) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { medicine: true },
    });
    if (!cartItems.length)
        throw new Error("Cart is empty");
    const total = cartItems.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);
    const order = await prisma.order.create({
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
    await prisma.cartItem.deleteMany({ where: { userId } });
    return order;
};
// Get all orders for a user
export const getOrdersService = async (userId) => {
    return prisma.order.findMany({
        where: { customerId: userId },
        include: { items: { include: { medicine: true } } },
        orderBy: { createdAt: "desc" },
    });
};
// Get order by id
export const getOrderByIdService = async (userId, orderId) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { medicine: true } } },
    });
    if (!order || order.customerId !== userId)
        throw new Error("Order not found");
    return order;
};
//# sourceMappingURL=orderService.js.map
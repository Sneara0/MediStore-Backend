import { prisma } from "../config/prisma";

export const placeOrderService = async (userId: string, shippingAddress: string) => {
  const cartItems = await prisma.cartItem.findMany({ where: { userId }, include: { medicine: true } });
  if (!cartItems.length) throw new Error("Cart is empty");

  const total = cartItems.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      customerId: userId,
      total,
      shippingAddress,
      status: "PLACED",
      items: {
        create: cartItems.map(item => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.medicine.price,
        })),
      },
    },
    include: { items: { include: { medicine: true } } },
  });

  // Clear cart
  await prisma.cartItem.deleteMany({ where: { userId } });

  return order;
};

export const getOrdersService = async (userId: string) => {
  return prisma.order.findMany({
    where: { customerId: userId },
    include: { items: { include: { medicine: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const getOrderByIdService = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { medicine: true } } },
  });
  if (!order || order.customerId !== userId) throw new Error("Order not found");
  return order;
};

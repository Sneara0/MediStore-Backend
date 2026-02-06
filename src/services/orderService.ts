import { prisma } from "../config/prisma";

// Type definitions
interface CartItemWithMedicine {
  id: string;
  medicineId: string;
  quantity: number;
  medicine: {
    id: string;
    name: string;
    price: number;
  };
}

// Place Order
export const placeOrderService = async (
  userId: string,
  shippingAddress: string
) => {
  const cartItems: CartItemWithMedicine[] = await prisma.cartItem.findMany({
    where: { userId },
    include: { medicine: true },
  });

  if (!cartItems.length) throw new Error("Cart is empty");

  const total: number = cartItems.reduce(
    (acc: number, item: CartItemWithMedicine) =>
      acc + item.medicine.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      customerId: userId,
      total,
      shippingAddress,
      status: "PLACED",
      items: {
        create: cartItems.map((item: CartItemWithMedicine) => ({
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
export const getOrdersService = async (userId: string) => {
  return prisma.order.findMany({
    where: { customerId: userId },
    include: { items: { include: { medicine: true } } },
    orderBy: { createdAt: "desc" },
  });
};

// Get order by id
export const getOrderByIdService = async (
  userId: string,
  orderId: string
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { medicine: true } } },
  });

  if (!order || order.customerId !== userId) throw new Error("Order not found");

  return order;
};

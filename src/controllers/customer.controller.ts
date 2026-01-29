import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// GET /api/customer/cart
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const cartItems = await prisma.orderItem.findMany({
      where: { order: { customerId: userId, status: "PLACED" } }, // assuming cart items are in PLACED orders
      include: { medicine: true },
    });

    res.status(200).json({ success: true, cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// POST /api/customer/checkout
export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { items, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items to checkout" });
    }

    let total = 0;

    const orderItemsData = await Promise.all(
      items.map(async (item: { medicineId: string; quantity: number }) => {
        const medicine = await prisma.medicine.findUnique({ where: { id: item.medicineId } });
        if (!medicine) throw new Error("Medicine not found");

        total += medicine.price * item.quantity;

        return {
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: medicine.price,
        };
      })
    );

    const order = await prisma.order.create({
      data: {
        customerId: userId,
        total,
        items: { create: orderItemsData },
      },
      include: { items: { include: { medicine: true } } },
    });

    res.status(201).json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/customer/orders
export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const orders = await prisma.order.findMany({
      where: { customerId: userId },
      include: { items: { include: { medicine: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// GET /api/customer/orders/:id
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    let { id } = req.params;
    if (Array.isArray(id)) {
      id = id[0];
    }

    const order = await prisma.order.findFirst({
      where: { id: id as string, customerId: userId },
      include: { items: { include: { medicine: true } } },
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { name, email, password } = req.body;

    const data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    res.status(200).json({ success: true, user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role } });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../types/auth.types";
import bcrypt from "bcryptjs";

// ===== Get Cart Items =====
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const cartItems = await prisma.orderItem.findMany({
      where: {
        order: {
          customerId,
          status: "PLACED",
        },
      },
      include: { medicine: true },
    });

    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Checkout =====
interface CheckoutItem {
  medicineId: string;
  quantity: number;
  price: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  shippingAddress?: string;
}

export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const { items }: CheckoutBody = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let total = 0;
    for (const item of items) {
      const medicine = await prisma.medicine.findUnique({ where: { id: item.medicineId } });
      if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });
      if (medicine.stock < item.quantity)
        return res.status(400).json({ success: false, message: `${medicine.name} is out of stock` });
      total += medicine.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        customerId,
        total,
        status: "PLACED",
        items: { create: items.map((item) => ({ ...item })) },
      },
    });

    // Reduce stock
    for (const item of items) {
      await prisma.medicine.update({
        where: { id: item.medicineId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Get Orders =====
export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: { items: { include: { medicine: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Get Order by ID =====
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { medicine: true } } },
    });

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.customerId !== customerId)
      return res.status(403).json({ success: false, message: "Not authorized" });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Profile =====
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "Not authorized" });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "Not authorized" });

    const { name, email, password } = req.body;
    const data: Partial<{ name: string; email: string; password: string }> = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({ where: { id: userId }, data });

    res.status(200).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

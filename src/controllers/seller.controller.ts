import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/* ==========================
   Add Medicine
========================== */
export const addMedicine = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name, description, price, stock, categoryId } = req.body;
    if (!name || !description || !price || !stock || !categoryId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const medicine = await prisma.medicine.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        sellerId: user.id,
      },
    });

    res.status(201).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Get Seller Medicines
========================== */
export const getMyMedicines = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const medicines = await prisma.medicine.findMany({
      where: { sellerId: user.id },
      include: { category: true },
    });

    res.json({ success: true, medicines });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Update Medicine
========================== */
export const updateMedicine = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      res.status(400).json({ message: "Invalid medicine ID" });
      return;
    }

    const medicine = await prisma.medicine.findFirst({
      where: { id, sellerId: user.id },
    });

    if (!medicine) {
      res.status(404).json({ message: "Medicine not found" });
      return;
    }

    const data: any = {};
    ["name", "description", "price", "stock", "categoryId"].forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    if (data.price) data.price = Number(data.price);
    if (data.stock) data.stock = Number(data.stock);

    const updated = await prisma.medicine.update({ where: { id }, data });

    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Delete Medicine
========================== */
export const deleteMedicine = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      res.status(400).json({ message: "Invalid medicine ID" });
      return;
    }

    const medicine = await prisma.medicine.findFirst({
      where: { id, sellerId: user.id },
    });

    if (!medicine) {
      res.status(404).json({ message: "Medicine not found" });
      return;
    }

    await prisma.medicine.delete({ where: { id } });

    res.json({ success: true, message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Get Seller Orders
========================== */
export const getSellerOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { items: { some: { medicine: { sellerId: user.id } } } },
      include: { items: { include: { medicine: true } }, customer: true },
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Update Order Status
========================== */
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }

    const { status } = req.body;
    const validStatuses = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const orderExists = await prisma.order.findUnique({ where: { id } });
    if (!orderExists) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const order = await prisma.order.update({ where: { id }, data: { status } });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

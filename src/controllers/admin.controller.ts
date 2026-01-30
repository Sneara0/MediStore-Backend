import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/* ==========================
   Admin Dashboard
========================== */
export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const [users, medicines, orders, categories] = await Promise.all([
      prisma.user.count(),
      prisma.medicine.count(),
      prisma.order.count(),
      prisma.category.count(),
    ]);

    res.json({
      success: true,
      stats: { users, medicines, orders, categories },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   View All Users
========================== */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isBanned: true,
        createdAt: true,
      },
    });

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Ban / Unban User
========================== */
export const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const idRaw = req.params.id;

    if (!idRaw || Array.isArray(idRaw)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const id: string = idRaw;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isBanned: !user.isBanned },
    });

    res.json({
      success: true,
      message: updatedUser.isBanned ? "User banned" : "User unbanned",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        isBanned: updatedUser.isBanned,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   View All Orders
========================== */
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { medicine: true } },
        customer: { select: { id: true, email: true } },
      },
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ==========================
   Categories
========================== */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const addCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Category name required" });
      return;
    }

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const idRaw = req.params.id;
    const { name } = req.body;

    if (!idRaw || Array.isArray(idRaw) || !name) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const id: string = idRaw;

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const idRaw = req.params.id;

    if (!idRaw || Array.isArray(idRaw)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const id: string = idRaw;

    await prisma.category.delete({ where: { id } });
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../types/auth.types";

// ===== Seller Dashboard =====
export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    // Total medicines
    const totalMedicines = await prisma.medicine.count({ where: { sellerId } });

    // Total orders received
    const totalOrders = await prisma.orderItem.count({
      where: { medicine: { sellerId } },
    });

    // Orders by status
    const ordersByStatus = await prisma.orderItem.groupBy({
      by: ["orderId"],
      _count: { orderId: true },
      where: { medicine: { sellerId } },
    });

    res.status(200).json({
      success: true,
      data: { totalMedicines, totalOrders, ordersByStatus },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Get All Medicines (Inventory) =====
export const getMedicines = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const medicines = await prisma.medicine.findMany({ where: { sellerId } });

    res.status(200).json({ success: true, data: medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Add Medicine =====
export const addMedicine = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const { name, description, price, stock, categoryId } = req.body;

    const medicine = await prisma.medicine.create({
      data: { name, description, price, stock, categoryId, sellerId },
    });

    res.status(201).json({ success: true, data: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Update Medicine =====
export const updateMedicine = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const medicine = await prisma.medicine.findUnique({ where: { id } });
    if (!medicine || medicine.sellerId !== sellerId)
      return res.status(403).json({ success: false, message: "Not allowed" });

    const updatedMedicine = await prisma.medicine.update({
      where: { id },
      data: { name, description, price, stock, categoryId },
    });

    res.status(200).json({ success: true, data: updatedMedicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Delete Medicine =====
export const deleteMedicine = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    const { id } = req.params;

    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const medicine = await prisma.medicine.findUnique({ where: { id } });
    if (!medicine || medicine.sellerId !== sellerId)
      return res.status(403).json({ success: false, message: "Not allowed" });

    await prisma.medicine.delete({ where: { id } });

    res.status(200).json({ success: true, message: "Medicine deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Get Seller Orders =====
export const getSellerOrders = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const orders = await prisma.orderItem.findMany({
      where: { medicine: { sellerId } },
      include: { order: true, medicine: true },
    });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Update Order Status =====
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    const { id } = req.params; // orderItem ID
    const { status } = req.body;

    if (!sellerId) return res.status(401).json({ success: false, message: "Not authorized" });

    const orderItem = await prisma.orderItem.findUnique({
      where: { id },
      include: { medicine: true },
    });

    if (!orderItem || orderItem.medicine.sellerId !== sellerId)
      return res.status(403).json({ success: false, message: "Not allowed" });

    const updatedOrder = await prisma.orderItem.update({
      where: { id },
      data: { order: { update: { status } } }, // update order status
    });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

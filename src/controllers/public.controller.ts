import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// ===== Home =====
export const getHome = async (req: Request, res: Response) => {
  try {
    // Featured medicines
    const featured = await prisma.medicine.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true, seller: true },
    });

    // Categories
    const categories = await prisma.category.findMany({
      include: { medicines: { take: 5 } },
    });

    res.status(200).json({ success: true, data: { featured, categories } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Shop (All medicines with filters) =====
export const getShop = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;

    const filters: any = {};
    if (category) filters.categoryId = category;
    if (minPrice || maxPrice) filters.price = {};
    if (minPrice) filters.price.gte = Number(minPrice);
    if (maxPrice) filters.price.lte = Number(maxPrice);
    if (search) filters.name = { contains: search as string, mode: "insensitive" };

    const medicines = await prisma.medicine.findMany({
      where: filters,
      include: { category: true, seller: true },
    });

    res.status(200).json({ success: true, data: medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===== Medicine Details =====
export const getMedicineDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const medicine = await prisma.medicine.findUnique({
      where: { id },
      include: { category: true, seller: true, reviews: { include: { customer: true } } },
    });

    if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });

    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getHome = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { medicines: { take: 4 } }, 
    });

    const featuredMedicines = await prisma.medicine.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      categories,
      featured: featuredMedicines,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const { categoryId, search, minPrice, maxPrice } = req.query;

 
    const categoryIdStr = Array.isArray(categoryId)
      ? categoryId[0]
      : categoryId;

 
    const priceFilter: any = {};
    if (minPrice) priceFilter.gte = Number(minPrice);
    if (maxPrice) priceFilter.lte = Number(maxPrice);

   
    const where: any = {};
    if (categoryIdStr) where.categoryId = categoryIdStr as string;
    if (search) where.name = { contains: search as string, mode: "insensitive" };
    if (Object.keys(priceFilter).length) where.price = priceFilter;

    const medicines = await prisma.medicine.findMany({
      where,
      include: { category: true, seller: true },
    });

    res.status(200).json({ success: true, medicines });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getMedicineById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) return res.status(400).json({ message: "Medicine ID is required" });

    const medicine = await prisma.medicine.findUnique({
      where: { id: id as string }, 
      include: { category: true, seller: true, reviews: true },
    });

    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

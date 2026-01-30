// src/controllers/public.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { ParsedQs } from "qs";


const toStringQuery = (
  value: string | ParsedQs | (string | ParsedQs)[] | undefined
): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const firstString = value.find((v) => typeof v === "string");
    return firstString;
  }
  return undefined; 
};


export const getHome = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { medicines: { take: 4 } },
    });

    const featuredMedicines = await prisma.medicine.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, categories, featured: featuredMedicines });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const categoryId = toStringQuery(req.query.categoryId);
    const search = toStringQuery(req.query.search);
    const minPrice = toStringQuery(req.query.minPrice);
    const maxPrice = toStringQuery(req.query.maxPrice);

    const priceFilter: any = {};
    if (minPrice) priceFilter.gte = Number(minPrice);
    if (maxPrice) priceFilter.lte = Number(maxPrice);

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (search) where.name = { contains: search, mode: "insensitive" };
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
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid medicine ID" });
    }

    const medicine = await prisma.medicine.findUnique({
      where: { id },
      include: { category: true, seller: true, reviews: true },
    });

    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

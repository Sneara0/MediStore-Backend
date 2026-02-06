import {prisma}  from "../config/prisma";

interface MedicineQuery {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

// Get all medicines with optional filters
export const getAllMedicinesService = async (query: MedicineQuery) => {
  const min = query.minPrice ? parseFloat(query.minPrice) : undefined;
  const max = query.maxPrice ? parseFloat(query.maxPrice) : undefined;

  return await prisma.medicine.findMany({
    where: {
      ...(query.category && { category: { name: query.category } }),
      ...(query.search && { name: { contains: query.search, mode: "insensitive" } }),
      ...(min !== undefined || max !== undefined
        ? {
            price: {
              ...(min !== undefined ? { gte: min } : {}),
              ...(max !== undefined ? { lte: max } : {}),
            },
          }
        : {}),
    },
    include: { category: true, seller: true, reviews: true },
    orderBy: { createdAt: "desc" },
  });
};

// Get single medicine by ID
export const getMedicineByIdService = async (id: string) => {
  return await prisma.medicine.findUnique({
    where: { id },
    include: { category: true, seller: true, reviews: true },
  });
};

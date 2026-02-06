"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicineByIdService = exports.getAllMedicinesService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Get all medicines with optional filters
const getAllMedicinesService = async (query) => {
    const min = query.minPrice ? parseFloat(query.minPrice) : undefined;
    const max = query.maxPrice ? parseFloat(query.maxPrice) : undefined;
    return await prisma_1.default.medicine.findMany({
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
exports.getAllMedicinesService = getAllMedicinesService;
// Get single medicine by ID
const getMedicineByIdService = async (id) => {
    return await prisma_1.default.medicine.findUnique({
        where: { id },
        include: { category: true, seller: true, reviews: true },
    });
};
exports.getMedicineByIdService = getMedicineByIdService;

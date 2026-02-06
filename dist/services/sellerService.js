"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusService = exports.getSellerOrdersService = exports.deleteMedicineService = exports.updateMedicineService = exports.addMedicineService = exports.getSellerMedicinesService = exports.getSellerDashboardService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const client_1 = require("@prisma/client");
// ১. Get Seller Dashboard
const getSellerDashboardService = async (sellerId) => {
    const totalMedicines = await prisma_1.default.medicine.count({
        where: { sellerId },
    });
    const orders = await prisma_1.default.order.findMany({
        include: {
            items: {
                include: { medicine: true },
            },
        },
    });
    const sellerOrders = orders.filter((order) => order.items.some((item) => item.medicine.sellerId === sellerId));
    return {
        totalMedicines,
        totalOrders: sellerOrders.length,
        pendingOrders: sellerOrders.filter((o) => o.status === client_1.OrderStatus.PLACED || o.status === client_1.OrderStatus.PROCESSING).length,
    };
};
exports.getSellerDashboardService = getSellerDashboardService;
// ২. Get Seller Medicines
const getSellerMedicinesService = async (sellerId) => {
    return prisma_1.default.medicine.findMany({
        where: { sellerId },
        include: { category: true },
    });
};
exports.getSellerMedicinesService = getSellerMedicinesService;
// ৩. Add Medicine (Relation safe)
const addMedicineService = async (sellerId, data) => {
    return prisma_1.default.medicine.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            seller: { connect: { id: sellerId } },
            category: { connect: { id: data.categoryId } },
        },
    });
};
exports.addMedicineService = addMedicineService;
// ৪. Update Medicine
const updateMedicineService = async (sellerId, medicineId, data) => {
    const medicine = await prisma_1.default.medicine.findUnique({
        where: { id: medicineId },
    });
    if (!medicine || medicine.sellerId !== sellerId) {
        throw new Error("Not authorized");
    }
    const updateData = { ...data };
    if (data.categoryId) {
        updateData.category = { connect: { id: data.categoryId } };
        delete updateData.categoryId;
    }
    return prisma_1.default.medicine.update({
        where: { id: medicineId },
        data: updateData,
    });
};
exports.updateMedicineService = updateMedicineService;
// ৫. Delete Medicine
const deleteMedicineService = async (sellerId, medicineId) => {
    const medicine = await prisma_1.default.medicine.findUnique({
        where: { id: medicineId },
    });
    if (!medicine || medicine.sellerId !== sellerId) {
        throw new Error("Not authorized");
    }
    return prisma_1.default.medicine.delete({
        where: { id: medicineId },
    });
};
exports.deleteMedicineService = deleteMedicineService;
// ৬. Get Seller Orders
const getSellerOrdersService = async (sellerId) => {
    const orders = await prisma_1.default.order.findMany({
        include: {
            customer: true,
            items: {
                include: { medicine: true },
            },
        },
    });
    return orders.filter((order) => order.items.some((item) => item.medicine.sellerId === sellerId));
};
exports.getSellerOrdersService = getSellerOrdersService;
// ৭. Update Order Status (Enum compatible)
const updateOrderStatusService = async (sellerId, orderId, status // Enum ব্যবহার করা হচ্ছে
) => {
    const orders = await (0, exports.getSellerOrdersService)(sellerId);
    const order = orders.find((o) => o.id === orderId);
    if (!order)
        throw new Error("Order not found");
    return prisma_1.default.order.update({
        where: { id: orderId },
        data: { status }, // Enum value ব্যবহার
    });
};
exports.updateOrderStatusService = updateOrderStatusService;

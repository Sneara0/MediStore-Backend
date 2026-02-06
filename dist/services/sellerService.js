"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusService = exports.getSellerOrdersService = exports.deleteMedicineService = exports.updateMedicineService = exports.addMedicineService = exports.getSellerMedicinesService = exports.getSellerDashboardService = void 0;
const prisma_1 = require("../config/prisma");
// ১. Seller Dashboard
const getSellerDashboardService = async (sellerId) => {
    const totalMedicines = await prisma_1.prisma.medicine.count({
        where: { sellerId },
    });
    const orders = await prisma_1.prisma.order.findMany({
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
        pendingOrders: sellerOrders.filter((o) => o.status === "PLACED" || o.status === "PROCESSING").length,
    };
};
exports.getSellerDashboardService = getSellerDashboardService;
// ২. Get Seller Medicines
const getSellerMedicinesService = async (sellerId) => {
    return prisma_1.prisma.medicine.findMany({
        where: { sellerId },
        include: { category: true },
    });
};
exports.getSellerMedicinesService = getSellerMedicinesService;
// ৩. Add Medicine
const addMedicineService = async (sellerId, data) => {
    return prisma_1.prisma.medicine.create({
        data: {
            ...data,
            sellerId,
        },
    });
};
exports.addMedicineService = addMedicineService;
// ৪. Update Medicine
const updateMedicineService = async (sellerId, medicineId, data) => {
    const medicine = await prisma_1.prisma.medicine.findUnique({
        where: { id: medicineId },
    });
    if (!medicine || medicine.sellerId !== sellerId) {
        throw new Error("Not authorized");
    }
    return prisma_1.prisma.medicine.update({
        where: { id: medicineId },
        data,
    });
};
exports.updateMedicineService = updateMedicineService;
// ৫. Delete Medicine
const deleteMedicineService = async (sellerId, medicineId) => {
    const medicine = await prisma_1.prisma.medicine.findUnique({
        where: { id: medicineId },
    });
    if (!medicine || medicine.sellerId !== sellerId) {
        throw new Error("Not authorized");
    }
    return prisma_1.prisma.medicine.delete({
        where: { id: medicineId },
    });
};
exports.deleteMedicineService = deleteMedicineService;
// ৬. Get Seller Orders
const getSellerOrdersService = async (sellerId) => {
    const orders = await prisma_1.prisma.order.findMany({
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
// ৭. Update Order Status
const updateOrderStatusService = async (sellerId, orderId, status) => {
    const orders = await (0, exports.getSellerOrdersService)(sellerId);
    const order = orders.find((o) => o.id === orderId);
    if (!order)
        throw new Error("Order not found");
    return prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};
exports.updateOrderStatusService = updateOrderStatusService;

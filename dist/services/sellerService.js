import { prisma } from "../config/prisma";
export const getSellerDashboardService = async (sellerId) => {
    const totalMedicines = await prisma.medicine.count({
        where: { sellerId },
    });
    const orders = await prisma.order.findMany({
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
export const getSellerMedicinesService = async (sellerId) => {
    return prisma.medicine.findMany({
        where: { sellerId },
        include: { category: true },
    });
};
export const addMedicineService = async (sellerId, data) => {
    return prisma.medicine.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId,
            sellerId,
        },
    });
};
export const updateMedicineService = async (sellerId, medicineId, data) => {
    const medicine = await prisma.medicine.findUnique({
        where: { id: medicineId },
    });
    if (!medicine || medicine.sellerId !== sellerId) {
        throw new Error("Not authorized");
    }
    return prisma.medicine.update({
        where: { id: medicineId },
        data,
    });
};
export const deleteMedicineService = async (sellerId, medicineId) => {
    const medicine = await prisma.medicine.findUnique({
        where: { id: medicineId },
    });
    if (!medicine || medicine.sellerId !== sellerId) {
        throw new Error("Not authorized");
    }
    return prisma.medicine.delete({
        where: { id: medicineId },
    });
};
export const getSellerOrdersService = async (sellerId) => {
    const orders = await prisma.order.findMany({
        include: {
            customer: true,
            items: {
                include: { medicine: true },
            },
        },
    });
    return orders.filter((order) => order.items.some((item) => item.medicine.sellerId === sellerId));
};
export const updateOrderStatusService = async (sellerId, orderId, status) => {
    const orders = await getSellerOrdersService(sellerId);
    const order = orders.find((o) => o.id === orderId);
    if (!order)
        throw new Error("Order not found");
    return prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};
//# sourceMappingURL=sellerService.js.map
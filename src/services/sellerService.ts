import { prisma } from "../config/prisma";

/* ===========================
   Dashboard Stats
=========================== */
export const getSellerDashboardService = async (sellerId: string) => {
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

  // Filter only seller orders
  const sellerOrders = orders.filter((order) =>
    order.items.some((item) => item.medicine.sellerId === sellerId)
  );

  return {
    totalMedicines,
    totalOrders: sellerOrders.length,
    pendingOrders: sellerOrders.filter(
      (o) => o.status === "PLACED" || o.status === "PROCESSING"
    ).length,
  };
};

/* ===========================
   Seller Medicines
=========================== */
export const getSellerMedicinesService = async (sellerId: string) => {
  return prisma.medicine.findMany({
    where: { sellerId },
    include: { category: true },
  });
};

export const addMedicineService = async (
  sellerId: string,
  data: any
) => {
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

export const updateMedicineService = async (
  sellerId: string,
  medicineId: string,
  data: any
) => {
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

export const deleteMedicineService = async (
  sellerId: string,
  medicineId: string
) => {
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

/* ===========================
   Seller Orders
=========================== */
export const getSellerOrdersService = async (sellerId: string) => {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: { medicine: true },
      },
    },
  });

  return orders.filter((order) =>
    order.items.some((item) => item.medicine.sellerId === sellerId)
  );
};

export const updateOrderStatusService = async (
  sellerId: string,
  orderId: string,
  status: string
) => {
  const orders = await getSellerOrdersService(sellerId);

  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error("Order not found");

  return prisma.order.update({
    where: { id: orderId },
    data: { status } as any,
  });
};

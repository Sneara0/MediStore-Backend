import { prisma } from "../config/prisma";
import { Medicine, Order, OrderItem } from "@prisma/client";

// ১. Seller Dashboard
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

// ২. Get Seller Medicines
export const getSellerMedicinesService = async (sellerId: string) => {
  return prisma.medicine.findMany({
    where: { sellerId },
    include: { category: true },
  });
};

// ৩. Add Medicine
export const addMedicineService = async (
  sellerId: string,
  data: Omit<Medicine, "id" | "sellerId" | "createdAt" | "updatedAt">
) => {
  return prisma.medicine.create({
    data: {
      ...data,
      sellerId,
    },
  });
};

// ৪. Update Medicine
export const updateMedicineService = async (
  sellerId: string,
  medicineId: string,
  data: Partial<Omit<Medicine, "id" | "sellerId" | "createdAt" | "updatedAt">>
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

// ৫. Delete Medicine
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

// ৬. Get Seller Orders
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

// ৭. Update Order Status
export const updateOrderStatusService = async (
  sellerId: string,
  orderId: string,
  status: Order["status"]
) => {
  const orders = await getSellerOrdersService(sellerId);

  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error("Order not found");

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

import prisma from "../config/prisma";
import { OrderStatus } from "@prisma/client";

// ১. Get Seller Dashboard
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
      (o) => o.status === OrderStatus.PLACED || o.status === OrderStatus.PROCESSING
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

// ৩. Add Medicine (Relation safe)
export const addMedicineService = async (
  sellerId: string,
  data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  }
) => {
  return prisma.medicine.create({
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

// ৪. Update Medicine
export const updateMedicineService = async (
  sellerId: string,
  medicineId: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  }>
) => {
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId },
  });

  if (!medicine || medicine.sellerId !== sellerId) {
    throw new Error("Not authorized");
  }

  const updateData: any = { ...data };
  if (data.categoryId) {
    updateData.category = { connect: { id: data.categoryId } };
    delete updateData.categoryId;
  }

  return prisma.medicine.update({
    where: { id: medicineId },
    data: updateData,
  });
};

// ৫. Delete Medicine
export const deleteMedicineService = async (sellerId: string, medicineId: string) => {
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

// ৭. Update Order Status (Enum compatible)
export const updateOrderStatusService = async (
  sellerId: string,
  orderId: string,
  status: OrderStatus // Enum ব্যবহার করা হচ্ছে
) => {
  const orders = await getSellerOrdersService(sellerId);

  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error("Order not found");

  return prisma.order.update({
    where: { id: orderId },
    data: { status }, // Enum value ব্যবহার
  });
};

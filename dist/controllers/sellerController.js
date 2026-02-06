import { getSellerDashboardService, getSellerMedicinesService, addMedicineService, updateMedicineService, deleteMedicineService, getSellerOrdersService, updateOrderStatusService, } from "../services/sellerService";
/* ===========================
   Seller Dashboard
=========================== */
export const getSellerDashboard = async (req, res) => {
    const sellerId = req.user.id;
    const stats = await getSellerDashboardService(sellerId);
    res.json({
        success: true,
        data: stats,
    });
};
/* ===========================
   Seller Medicines
=========================== */
export const getSellerMedicines = async (req, res) => {
    const sellerId = req.user.id;
    const medicines = await getSellerMedicinesService(sellerId);
    res.json({
        success: true,
        data: medicines,
    });
};
/* ===========================
   Add Medicine
=========================== */
export const addMedicine = async (req, res) => {
    const sellerId = req.user.id;
    const medicine = await addMedicineService(sellerId, req.body);
    res.status(201).json({
        success: true,
        message: "Medicine added successfully",
        data: medicine,
    });
};
/* ===========================
   Update Medicine
=========================== */
export const updateMedicine = async (req, res) => {
    const sellerId = req.user.id;
    const medicineId = req.params.id;
    const updated = await updateMedicineService(sellerId, medicineId, req.body);
    res.json({
        success: true,
        message: "Medicine updated successfully",
        data: updated,
    });
};
/* ===========================
   Delete Medicine
=========================== */
export const deleteMedicine = async (req, res) => {
    const sellerId = req.user.id;
    const medicineId = req.params.id;
    await deleteMedicineService(sellerId, medicineId);
    res.json({
        success: true,
        message: "Medicine deleted successfully",
    });
};
/* ===========================
   Seller Orders
=========================== */
export const getSellerOrders = async (req, res) => {
    const sellerId = req.user.id;
    const orders = await getSellerOrdersService(sellerId);
    res.json({
        success: true,
        data: orders,
    });
};
/* ===========================
   Update Order Status
=========================== */
export const updateOrderStatus = async (req, res) => {
    const sellerId = req.user.id;
    const orderId = req.params.id;
    const { status } = req.body;
    const updated = await updateOrderStatusService(sellerId, orderId, status);
    res.json({
        success: true,
        message: "Order status updated successfully",
        data: updated,
    });
};
//# sourceMappingURL=sellerController.js.map
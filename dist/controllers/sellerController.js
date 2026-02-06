"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getSellerOrders = exports.deleteMedicine = exports.updateMedicine = exports.addMedicine = exports.getSellerMedicines = exports.getSellerDashboard = void 0;
const sellerService_js_1 = require("../services/sellerService.js");
/* ===========================
   Seller Dashboard
=========================== */
const getSellerDashboard = async (req, res) => {
    const sellerId = req.user.id;
    const stats = await (0, sellerService_js_1.getSellerDashboardService)(sellerId);
    res.json({
        success: true,
        data: stats,
    });
};
exports.getSellerDashboard = getSellerDashboard;
/* ===========================
   Seller Medicines
=========================== */
const getSellerMedicines = async (req, res) => {
    const sellerId = req.user.id;
    const medicines = await (0, sellerService_js_1.getSellerMedicinesService)(sellerId);
    res.json({
        success: true,
        data: medicines,
    });
};
exports.getSellerMedicines = getSellerMedicines;
/* ===========================
   Add Medicine
=========================== */
const addMedicine = async (req, res) => {
    const sellerId = req.user.id;
    const medicine = await (0, sellerService_js_1.addMedicineService)(sellerId, req.body);
    res.status(201).json({
        success: true,
        message: "Medicine added successfully",
        data: medicine,
    });
};
exports.addMedicine = addMedicine;
/* ===========================
   Update Medicine
=========================== */
const updateMedicine = async (req, res) => {
    const sellerId = req.user.id;
    const medicineId = req.params.id;
    const updated = await (0, sellerService_js_1.updateMedicineService)(sellerId, medicineId, req.body);
    res.json({
        success: true,
        message: "Medicine updated successfully",
        data: updated,
    });
};
exports.updateMedicine = updateMedicine;
/* ===========================
   Delete Medicine
=========================== */
const deleteMedicine = async (req, res) => {
    const sellerId = req.user.id;
    const medicineId = req.params.id;
    await (0, sellerService_js_1.deleteMedicineService)(sellerId, medicineId);
    res.json({
        success: true,
        message: "Medicine deleted successfully",
    });
};
exports.deleteMedicine = deleteMedicine;
/* ===========================
   Seller Orders
=========================== */
const getSellerOrders = async (req, res) => {
    const sellerId = req.user.id;
    const orders = await (0, sellerService_js_1.getSellerOrdersService)(sellerId);
    res.json({
        success: true,
        data: orders,
    });
};
exports.getSellerOrders = getSellerOrders;
/* ===========================
   Update Order Status
=========================== */
const updateOrderStatus = async (req, res) => {
    const sellerId = req.user.id;
    const orderId = req.params.id;
    const { status } = req.body;
    const updated = await (0, sellerService_js_1.updateOrderStatusService)(sellerId, orderId, status);
    res.json({
        success: true,
        message: "Order status updated successfully",
        data: updated,
    });
};
exports.updateOrderStatus = updateOrderStatus;

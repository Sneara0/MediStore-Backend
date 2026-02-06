"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicineById = exports.getAllMedicines = void 0;
const medicineService_js_1 = require("../services/medicineService.js");
const getAllMedicines = async (req, res) => {
    try {
        const query = req.query;
        const medicines = await (0, medicineService_js_1.getAllMedicinesService)(query);
        res.status(200).json({ success: true, count: medicines.length, data: medicines });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.getAllMedicines = getAllMedicines;
const getMedicineById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            throw new Error("Medicine ID is required");
        const medicine = await (0, medicineService_js_1.getMedicineByIdService)(id);
        if (!medicine)
            return res.status(404).json({ success: false, message: "Medicine not found" });
        res.status(200).json({ success: true, data: medicine });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
exports.getMedicineById = getMedicineById;

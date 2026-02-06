import { getAllMedicinesService, getMedicineByIdService } from "../services/medicineService";
export const getAllMedicines = async (req, res) => {
    try {
        const query = req.query;
        const medicines = await getAllMedicinesService(query);
        res.status(200).json({ success: true, count: medicines.length, data: medicines });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getMedicineById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            throw new Error("Medicine ID is required");
        const medicine = await getMedicineByIdService(id);
        if (!medicine)
            return res.status(404).json({ success: false, message: "Medicine not found" });
        res.status(200).json({ success: true, data: medicine });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};
//# sourceMappingURL=medicineController.js.map
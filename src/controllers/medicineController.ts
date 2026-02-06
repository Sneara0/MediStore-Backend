import { Request, Response } from "express";
import { getAllMedicinesService, getMedicineByIdService } from "../services/medicineService.js";

export const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const query = req.query as Record<string, string>;
    const medicines = await getAllMedicinesService(query);

    res.status(200).json({ success: true, count: medicines.length, data: medicines });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMedicineById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) throw new Error("Medicine ID is required");

    const medicine = await getMedicineByIdService(id);
    if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });

    res.status(200).json({ success: true, data: medicine });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

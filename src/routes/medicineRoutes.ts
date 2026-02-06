import { Router } from "express";
import { getAllMedicines, getMedicineById } from "../controllers/medicineController.js";
const router = Router();
router.get("/", getAllMedicines);      // /shop
router.get("/:id", getMedicineById);   // /shop/:id
export default router;

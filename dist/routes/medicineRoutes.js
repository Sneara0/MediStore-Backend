import { Router } from "express";
import { getAllMedicines, getMedicineById } from "../controllers/medicineController";
const router = Router();
router.get("/", getAllMedicines); // /shop
router.get("/:id", getMedicineById); // /shop/:id
export default router;
//# sourceMappingURL=medicineRoutes.js.map
import { Router } from "express";
import { getHome, getAllMedicines, getMedicineById } from "../controllers/public.controller";

const router = Router();


router.get("/", getHome);
router.get("/shop", getAllMedicines);
router.get("/shop/:id", getMedicineById);

export default router;

import express from "express";
import {
  getDashboard,
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/seller.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = express.Router();

// All routes protected + SELLER-only
router.use(protect, authorize("SELLER"));

// Dashboard
router.get("/dashboard", getDashboard);

// Medicines CRUD
router.get("/medicines", getMedicines);
router.post("/medicines", addMedicine);
router.put("/medicines/:id", updateMedicine);
router.delete("/medicines/:id", deleteMedicine);

// Orders
router.get("/orders", getSellerOrders);
router.patch("/orders/:id", updateOrderStatus);

export default router;

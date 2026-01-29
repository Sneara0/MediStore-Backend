import express from "express";
import {
  getCart,
  checkout,
  getOrders,
  getOrderById,
  getProfile,
  updateProfile,
} from "../controllers/customer.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = express.Router();

// All routes protected + CUSTOMER only
router.use(protect, authorize("CUSTOMER"));

router.get("/cart", getCart);
router.post("/checkout", checkout);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;

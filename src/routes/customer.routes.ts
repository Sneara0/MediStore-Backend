import { Router } from "express";
import { protect } from "../middleware/protect.js";
import { authorize } from "../middleware/authorize.js";
import { getCart, checkout, getOrders, getOrderById, getProfile, updateProfile } from "../controllers/customer.controller.js";

const router = Router();

router.use(protect); 
router.use(authorize("CUSTOMER")); 

router.get("/cart", getCart);
router.post("/checkout", checkout);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;

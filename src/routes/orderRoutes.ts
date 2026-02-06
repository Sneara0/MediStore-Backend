import { Router } from "express";
import { placeOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();
router.use(protect(["CUSTOMER"]));

router.post("/checkout", placeOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrderById);

export default router;

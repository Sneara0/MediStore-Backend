import { Router } from "express";
import { placeOrder, getOrders, getOrderById } from "../controllers/orderController";
import { protect } from "../middlewares/auth";
const router = Router();
router.use(protect(["CUSTOMER"]));
router.post("/checkout", placeOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrderById);
export default router;
//# sourceMappingURL=orderRoutes.js.map
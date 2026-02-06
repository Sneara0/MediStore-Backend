import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController";
import { protect } from "../middlewares/auth";
const router = Router();
router.use(protect(["CUSTOMER"]));
router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:cartItemId", removeFromCart);
export default router;
//# sourceMappingURL=cartRoutes.js.map
import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";
import { protect } from "../middlewares/auth";
const router = Router();
router.use(protect(["CUSTOMER"]));
router.get("/", getProfile);
router.put("/", updateProfile);
export default router;
//# sourceMappingURL=profileRoutes.js.map
import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();
router.use(protect(["CUSTOMER"]));

router.get("/", getProfile);
router.put("/", updateProfile);

export default router;

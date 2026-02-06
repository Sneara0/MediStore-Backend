import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validations/authValidation";

const router = Router();

// ✅ Register Route Validation
router.post("/register", validate(registerSchema), registerUser);

// ✅ Login Route Validation
router.post("/login", validate(loginSchema), loginUser);

export default router;

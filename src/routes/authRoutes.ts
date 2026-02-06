import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validations/authValidation";

const router = Router();


router.post("/register", validate(registerSchema), registerUser);


router.post("/login", validate(loginSchema), loginUser);

export default router;

import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";

// protect এবং RequestWithUser ইম্পোর্ট করুন (আপনার ফাইলের নাম অনুযায়ী পাথ চেক করুন)
import { protect, RequestWithUser } from "../middlewares/auth.js"; 
import { Response } from "express";

const router = Router();

// ✅ Register Route
router.post("/register", validate(registerSchema), registerUser);

// ✅ Login Route
router.post("/login", validate(loginSchema), loginUser);

// ✅ Get Me Route (এটি না থাকলে /api/auth/me 404 দেখাবে)
router.get("/me", protect(), (req: RequestWithUser, res: Response) => {
  res.status(200).json({
    success: true,
    data: req.user, // protect মিডলওয়্যার থেকে আসা ইউজার ডেটা
  });
});

export default router;
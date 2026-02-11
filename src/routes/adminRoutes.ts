import express from "express";
import {
  adminLogin,
  getAllUsers,
  toggleBanUser,
  getAllOrders,
  addCategory,
  deleteCategory,
} from "../controllers/adminController.js";

import { protect } from "../middlewares/auth.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

/**
 * @section Public Routes
 * These do not require a token. 
 * Use this to authenticate with your admin credentials.
 */
router.post("/login", adminLogin);

/**
 * @section Protected Admin Routes
 * Global middleware: 
 * 1. 'protect' verifies the JWT token.
 * 2. 'roleMiddleware' ensures only users with the "ADMIN" role proceed.
 */
router.use(protect);
router.use(roleMiddleware("ADMIN"));

// User Management
router.get("/users", getAllUsers);
router.patch("/users/:id/ban", toggleBanUser);

// Order Management
router.get("/orders", getAllOrders);

// Category Management
router.post("/categories", addCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
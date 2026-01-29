import express from "express";
import {
  getDashboard,
  getUsers,
  updateUserStatus,
  getAllOrders,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/admin.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = express.Router();

// All routes protected + ADMIN-only
router.use(protect, authorize("ADMIN"));

// Dashboard
router.get("/", getDashboard);

// Users
router.get("/users", getUsers);
router.patch("/users/:id", updateUserStatus);

// Orders
router.get("/orders", getAllOrders);

// Categories
router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;

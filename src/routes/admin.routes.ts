import express from "express";
import { protect } from "../middleware/protect";
import { authorize } from "../middleware/authorize";
import * as adminController from "../controllers/admin.controller";

const router = express.Router();

// ✅ All admin routes are protected + only ADMIN
router.use(protect, authorize("ADMIN")); // 🔒 Private admin routes

/* ==========================
   Dashboard
========================== */
router.get("/", adminController.getDashboard);

/* ==========================
   Users
========================== */
router.get("/users", adminController.getAllUsers);
router.put("/users/:id/toggle-status", adminController.toggleUserStatus);

/* ==========================
   Orders
========================== */
router.get("/orders", adminController.getAllOrders);

/* ==========================
   Categories
========================== */
router.get("/categories", adminController.getAllCategories);
router.post("/categories", adminController.addCategory);
router.put("/categories/:id", adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

export default router;

import express from "express";
import {
  getAllUsers,
  toggleBanUser,
  getAllOrders,
  addCategory,
  deleteCategory,
} from "../controllers/adminController";

import { protect } from "../middlewares/auth";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = express.Router();

router.use(protect);
router.use(roleMiddleware("ADMIN"));

router.get("/users", getAllUsers);
router.patch("/users/:id/ban", toggleBanUser);

router.get("/orders", getAllOrders);

router.post("/categories", addCategory);
router.delete("/categories/:id", deleteCategory);

export default router;

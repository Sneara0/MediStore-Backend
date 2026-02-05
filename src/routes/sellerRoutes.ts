import express from "express";
import { protect } from "../middlewares/auth";

import {
  getSellerDashboard,
  getSellerMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/sellerController";

const router = express.Router();

/* ===========================
   Seller Dashboard
=========================== */
router.get(
  "/dashboard",
  protect(["SELLER"]),
  getSellerDashboard
);

/* ===========================
   Seller Medicines CRUD
=========================== */
router.get(
  "/medicines",
  protect(["SELLER"]),
  getSellerMedicines
);

router.post(
  "/medicines",
  protect(["SELLER"]),
  addMedicine
);

router.put(
  "/medicines/:id",
  protect(["SELLER"]),
  updateMedicine
);

router.delete(
  "/medicines/:id",
  protect(["SELLER"]),
  deleteMedicine
);

/* ===========================
   Seller Orders
=========================== */
router.get(
  "/orders",
  protect(["SELLER"]),
  getSellerOrders
);

router.patch(
  "/orders/:id",
  protect(["SELLER"]),
  updateOrderStatus
);

export default router;

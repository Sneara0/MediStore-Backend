import express from "express";
import { protect } from "../middlewares/auth.js";

import {
  getSellerDashboard,
  getSellerMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/sellerController.js";

const router = express.Router();


router.get(
  "/dashboard",
  protect(["SELLER"]),
  getSellerDashboard
);


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

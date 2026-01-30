import express from "express";
import { protect } from "../middleware/protect";
import { authorize } from "../middleware/authorize";
import * as sellerController from "../controllers/seller.controller";

const router = express.Router();

router.use(protect, authorize("SELLER"));


router.get("/dashboard", async (req, res) => {
  try {
    res.json({ message: "Seller Dashboard - coming soon" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.post("/medicines", sellerController.addMedicine);
router.get("/medicines", sellerController.getMyMedicines);
router.put("/medicines/:id", sellerController.updateMedicine);
router.delete("/medicines/:id", sellerController.deleteMedicine);

router.get("/orders", sellerController.getSellerOrders);
router.put("/orders/:id", sellerController.updateOrderStatus);

export default router;

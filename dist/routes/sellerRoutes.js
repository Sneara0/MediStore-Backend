"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middlewares/auth.js");
const sellerController_js_1 = require("../controllers/sellerController.js");
const router = express_1.default.Router();
router.get("/dashboard", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.getSellerDashboard);
router.get("/medicines", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.getSellerMedicines);
router.post("/medicines", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.addMedicine);
router.put("/medicines/:id", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.updateMedicine);
router.delete("/medicines/:id", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.deleteMedicine);
router.get("/orders", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.getSellerOrders);
router.patch("/orders/:id", (0, auth_js_1.protect)(["SELLER"]), sellerController_js_1.updateOrderStatus);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_js_1 = require("../controllers/adminController.js");
const auth_js_1 = require("../middlewares/auth.js");
const roleMiddleware_js_1 = require("../middlewares/roleMiddleware.js");
const router = express_1.default.Router();
router.use(auth_js_1.protect);
router.use((0, roleMiddleware_js_1.roleMiddleware)("ADMIN"));
router.get("/users", adminController_js_1.getAllUsers);
router.patch("/users/:id/ban", adminController_js_1.toggleBanUser);
router.get("/orders", adminController_js_1.getAllOrders);
router.post("/categories", adminController_js_1.addCategory);
router.delete("/categories/:id", adminController_js_1.deleteCategory);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicineController_js_1 = require("../controllers/medicineController.js");
const router = (0, express_1.Router)();
router.get("/", medicineController_js_1.getAllMedicines); // /shop
router.get("/:id", medicineController_js_1.getMedicineById); // /shop/:id
exports.default = router;

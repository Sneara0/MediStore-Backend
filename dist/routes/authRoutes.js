"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
const validate_1 = require("../middlewares/validate");
const authValidation_js_1 = require("../validations/authValidation.js");
const router = (0, express_1.Router)();
// ✅ Register Route Validation
router.post("/register", (0, validate_1.validate)(authValidation_js_1.registerSchema), authController_js_1.registerUser);
// ✅ Login Route Validation
router.post("/login", (0, validate_1.validate)(authValidation_js_1.loginSchema), authController_js_1.loginUser);
exports.default = router;

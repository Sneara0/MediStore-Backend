"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const asyncHandler_js_1 = require("../errors/asyncHandler.js");
const ApiError_js_1 = require("../errors/ApiError.js");
const authService_1 = require("../services/authService");
// ✅ Register API
exports.registerUser = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        throw new ApiError_js_1.ApiError(400, "Name, Email, Password required!");
    }
    const user = await (0, authService_1.registerUserService)(name, email, password, role);
    res.status(201).json({
        success: true,
        message: `${user.role} registered successfully ✅`,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});
// ✅ Login API
exports.loginUser = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_js_1.ApiError(400, "Email & Password required!");
    }
    const { user, token } = await (0, authService_1.loginUserService)(email, password);
    res.status(200).json({
        success: true,
        message: "Login successful ✅",
        token,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

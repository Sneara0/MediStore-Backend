"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("./ApiError");
const errorHandler = (err, req, res, next) => {
    console.log("🔥 ERROR:", err);
    let statusCode = 500;
    let message = "Internal Server Error";
    // Custom Error
    if (err instanceof ApiError_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Prisma Duplicate Error
    if (err.code === "P2002") {
        statusCode = 400;
        message = "Duplicate value already exists!";
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;

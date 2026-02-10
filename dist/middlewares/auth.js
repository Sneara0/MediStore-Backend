"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const protect = (roles = []) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Not authorized" });
        }
        const token = authHeader.split(" ")[1];
        // Decode token safely
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Find user in DB
        const user = await prisma_1.prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user || user.isBanned)
            return res.status(401).json({ error: "Unauthorized" });
        // Role check
        if (roles.length && !roles.includes(user.role)) {
            return res.status(403).json({ error: "Role not allowed" });
        }
        // Attach user to request
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isBanned: user.isBanned,
        };
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Token invalid or expired" });
    }
};
exports.protect = protect;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not Authorized" });
    }
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            error: "Access denied. Role not allowed",
        });
    }
    next();
};
exports.roleMiddleware = roleMiddleware;

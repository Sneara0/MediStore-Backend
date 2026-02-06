import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
export const protect = (roles = []) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Not authorized" });
        }
        const token = authHeader.split(" ")[1];
        // Decode token safely
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find user in DB
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
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
//# sourceMappingURL=auth.js.map
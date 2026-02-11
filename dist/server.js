"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://medi-final-frontend.vercel.app",
        process.env.FRONTEND_URL || "",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const medicineRoutes_1 = __importDefault(require("./routes/medicineRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const sellerRoutes_1 = __importDefault(require("./routes/sellerRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const errorHandler_1 = require("./errors/errorHandler");
app.get("/", (req, res) => {
    res.status(200).send("MediStore Backend Running 🚀");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/medicines", medicineRoutes_1.default);
app.use("/api/cart", cartRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/profile", profileRoutes_1.default);
app.use("/api/seller", sellerRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;

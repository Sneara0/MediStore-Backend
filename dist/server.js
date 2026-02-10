"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
/* Load env */
dotenv_1.default.config();
const app = (0, express_1.default)();
/* CORS Setup */
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        process.env.FRONTEND_URL || "",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
/* Routes Import */
// নোট: TypeScript-এ সাধারণত .js এক্সটেনশন ছাড়াই ইম্পোর্ট করা হয়। 
// যদি আপনার এরর আসে, তবে এক্সটেনশন সরিয়ে ট্রাই করবেন।
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const medicineRoutes_js_1 = __importDefault(require("./routes/medicineRoutes.js"));
const cartRoutes_js_1 = __importDefault(require("./routes/cartRoutes.js"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const profileRoutes_js_1 = __importDefault(require("./routes/profileRoutes.js"));
const sellerRoutes_js_1 = __importDefault(require("./routes/sellerRoutes.js"));
const adminRoutes_js_1 = __importDefault(require("./routes/adminRoutes.js"));
/* Error Handler Import */
const errorHandler_js_1 = require("./errors/errorHandler.js");
/* Home Test Route */
app.get("/", (req, res) => {
    res.status(200).send("MediStore Backend Running 🚀");
});
/* API Routes */
app.use("/api/auth", authRoutes_js_1.default);
app.use("/api/medicines", medicineRoutes_js_1.default);
app.use("/api/cart", cartRoutes_js_1.default);
app.use("/api/orders", orderRoutes_js_1.default);
app.use("/api/profile", profileRoutes_js_1.default);
app.use("/api/seller", sellerRoutes_js_1.default);
app.use("/api/admin", adminRoutes_js_1.default);
/* Error Middleware */
app.use(errorHandler_js_1.errorHandler);
/* Server Listen - এটি শুধুমাত্র লোকাল ডেভেলপমেন্টের জন্য কাজ করবে */
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
/* Vercel এর জন্য Export */
exports.default = app;

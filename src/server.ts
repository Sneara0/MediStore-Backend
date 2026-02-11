import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

/* Load env */
dotenv.config();

const app = express();

/* CORS Setup */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL || "",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* Routes Import */
// গুরুত্বপূর্ণ: ES Modules ব্যবহার করলে ফাইলের শেষে .js এক্সটেনশন থাকা জরুরি।
import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* Error Handler Import */
import { errorHandler } from "./errors/errorHandler.js";

/* Home Test Route */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "MediStore Backend Running 🚀" });
});

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

/* Error Middleware */
app.use(errorHandler);

/* Server Listen - Local Development */
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

/* Vercel এর জন্য Export */
export default app;
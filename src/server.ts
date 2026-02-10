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
// নোট: TypeScript-এ সাধারণত .js এক্সটেনশন ছাড়াই ইম্পোর্ট করা হয়। 
// যদি আপনার এরর আসে, তবে এক্সটেনশন সরিয়ে ট্রাই করবেন।
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
  res.status(200).send("MediStore Backend Running 🚀");
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

/* Server Listen - এটি শুধুমাত্র লোকাল ডেভেলপমেন্টের জন্য কাজ করবে */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

/* Vercel এর জন্য Export */
export default app;
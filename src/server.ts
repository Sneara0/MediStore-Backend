import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://medistore-frontend-kappa.vercel.app", // আপনার লেটেস্ট ফ্রন্টএন্ড লিঙ্ক
  ],
  credentials: true,
}));

app.use(express.json());

// গুরুত্বপূর্ণ: .js এক্সটেনশন ছাড়াই ইমপোর্ট করুন
import authRoutes from "./routes/authRoutes";
import medicineRoutes from "./routes/medicineRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import profileRoutes from "./routes/profileRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import adminRoutes from "./routes/adminRoutes";
import { errorHandler } from "./errors/errorHandler";

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("MediStore Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app; 
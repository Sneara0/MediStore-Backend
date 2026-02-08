import express from "express";
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
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());

/* Routes */
import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* Error Handler */
import { errorHandler } from "./errors/errorHandler.js";

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

/* Home Test */
app.get("/", (req, res) => {
  res.send("MediStore Backend Running 🚀");
});

/* Error Middleware */
app.use(errorHandler);

/* Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

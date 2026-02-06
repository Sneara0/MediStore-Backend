import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import profileRoutes from "./routes/profileRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import adminRoutes from "./routes/adminRoutes";


import { errorHandler } from "./errors/errorHandler";


app.use("/api/auth", authRoutes);
app.use("/api/shop", medicineRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("MediStore Backend Running 🚀");
});


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

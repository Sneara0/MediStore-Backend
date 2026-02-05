import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes import
import authRoutes from "./routes/authRoutes";
import medicineRoutes from "./routes/medicineRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import profileRoutes from "./routes/profileRoutes";

// API Routes
app.use("/api/auth", authRoutes);       
app.use("/api/shop", medicineRoutes);  
app.use("/api/cart", cartRoutes);       
app.use("/api/orders", orderRoutes);    
app.use("/api/profile", profileRoutes);

// Root
app.get("/", (req, res) => {
  res.send("MediStore Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

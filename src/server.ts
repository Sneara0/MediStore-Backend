import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import authRoutes from "./routes/authRoutes";
import medicineRoutes from "./routes/medicineRoutes";
app.use("/api", authRoutes);
app.use("/api/shop", medicineRoutes);

app.get("/", (req, res) => {
  res.send("MediStore Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

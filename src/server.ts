import app from './app';
import publicRoutes from "./routes/public.routes";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes.js";
import adminRoutes from "./routes/admin.routes";
import { errorHandler } from "./middleware/errorHandler";




const PORT = process.env.PORT || 5000;
app.use("/api", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import app from './app';
import customerRoutes from "./routes/customer.routes";
import sellerRoutes from "./routes/seller.routes";
import adminRoutes from "./routes/admin.routes";
import publicRoutes from "./routes/public.routes";
const PORT = process.env.PORT || 5000;
app.use("/api/customer", customerRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

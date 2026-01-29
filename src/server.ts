import app from './app';
import publicRoutes from "./routes/public.routes";
import authRoutes from "./routes/auth.routes";


const PORT = process.env.PORT || 5000;
app.use("/api", publicRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

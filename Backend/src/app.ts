import express from "express";
import cors from "cors";
import authRoutes from "./api/auth.routes";
import cartRoutes from "./api/cart.routes";
import catalogRoutes from "./api/catalog.routes";
import contactRoutes from "./api/contact.routes";
import searchRoutes from "./api/search.routes";
import userRoutes from "./api/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales de la API
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", userRoutes);

// Ruta de prueba
app.get("/", (_req, res) => {
  res.json({ message: "API de Plena Studio funcionando" });
});

export default app;
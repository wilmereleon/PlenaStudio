import express from "express";
import cors from "cors";
import authRoutes from "./api/auth.routes";
import cartRoutes from "./api/cart.routes";
import catalogRoutes from "./api/catalog.routes";
import contactRoutes from "./api/contact.routes";
import searchRoutes from "./api/search.routes";
import userRoutes from "./api/user.routes";

const app = express();

// Configuración CORS mejorada para desarrollo
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'http://localhost',
    'http://localhost:5173',
    'http://localhost:4173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

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

// Ruta de health check para el frontend
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", message: "API funcionando correctamente" });
});

export default app;
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import almacenRoutes from "./src/routes/almacenRoutes.js";
import envioRoutes from "./src/routes/envioRoutes.js";

// Importar modelos para sincronización
import Usuario from "./src/models/Usuario.js";
import Cliente from "./src/models/Cliente.js";
import Almacen from "./src/models/Almacen.js";
import Envio from "./src/models/Envio.js";
import Producto from "./src/models/Producto.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad
app.use(helmet());

// Middleware CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Middleware de parseo
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Conectar a base de datos
await connectDB();

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/almacenes", almacenRoutes);
app.use("/api/envios", envioRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║    Servidor iniciado exitosamente    ║
║                                       ║
║  🚀 http://localhost:${PORT}              ║
║  📊 API: http://localhost:${PORT}/api      ║
║  💾 PostgreSQL: ✓ Conectado           ║
╚═══════════════════════════════════════╝
  `);
});

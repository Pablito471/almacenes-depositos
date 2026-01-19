const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });
const initializeDatabase = require("./database/init");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

// Rutas
const authRoutes = require("./routes/auth.routes");
const depositosRoutes = require("./routes/depositos.routes");
const productosRoutes = require("./routes/productos.routes");
const pedidosRoutes = require("./routes/pedidos.routes");
const enviosRoutes = require("./routes/envios.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/depositos", depositosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/envios", enviosRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend funcionando correctamente" });
});

// Error handler
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Servidor backend ejecutándose en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

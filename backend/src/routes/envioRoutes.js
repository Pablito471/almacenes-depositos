import express from "express";
import {
  crearEnvio,
  obtenerEnvios,
  obtenerEnvioPorId,
  actualizarEnvio,
  eliminarEnvio,
  restaurarEnvio,
} from "../controllers/envioController.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Todas las rutas requieren autenticación y rol admin
router.use(authMiddleware, adminOnly);

router.post("/", crearEnvio);
router.get("/", obtenerEnvios);
router.get("/:id", obtenerEnvioPorId);
router.put("/:id", actualizarEnvio);
router.delete("/:id", eliminarEnvio);
router.patch("/:id/restore", restaurarEnvio);

export default router;

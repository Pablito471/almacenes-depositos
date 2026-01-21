import express from "express";
import {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
  restaurarCliente,
} from "../controllers/clienteController.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Todas las rutas requieren autenticación y rol admin
router.use(authMiddleware, adminOnly);

router.post("/", crearCliente);
router.get("/", obtenerClientes);
router.get("/:id", obtenerClientePorId);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);
router.patch("/:id/restore", restaurarCliente);

export default router;

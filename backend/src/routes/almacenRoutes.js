import express from "express";
import {
  crearAlmacen,
  obtenerAlmacenes,
  obtenerAlmacenPorId,
  actualizarAlmacen,
  eliminarAlmacen,
  restaurarAlmacen,
} from "../controllers/almacenController.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// GET sin autenticación (vista pública)
router.get("/", obtenerAlmacenes);
router.get("/:id", obtenerAlmacenPorId);

// POST, PUT, DELETE requieren autenticación y rol admin
router.use(authMiddleware, adminOnly);

router.post("/", crearAlmacen);
router.put("/:id", actualizarAlmacen);
router.delete("/:id", eliminarAlmacen);
router.patch("/:id/restore", restaurarAlmacen);

export default router;

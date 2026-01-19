const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const productoService = require("../services/productoService");

const router = express.Router();

router.get("/deposito/:depositoId", async (req, res, next) => {
  try {
    const productos = await productoService.getProductosByDeposito(
      req.params.depositoId,
    );
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const producto = await productoService.getProductoById(req.params.id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:depositoId",
  authMiddleware,
  requireRole("deposito"),
  async (req, res, next) => {
    try {
      const producto = await productoService.createProducto(
        req.params.depositoId,
        req.body,
      );
      res.status(201).json(producto);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("deposito"),
  async (req, res, next) => {
    try {
      const producto = await productoService.updateProducto(
        req.params.id,
        req.body,
      );
      res.json(producto);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("deposito"),
  async (req, res, next) => {
    try {
      await productoService.deleteProducto(req.params.id);
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;

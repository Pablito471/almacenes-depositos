const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const pedidoService = require("../services/pedidoService");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole("cliente"),
  async (req, res, next) => {
    try {
      const { depositoId, items } = req.body;
      const pedido = await pedidoService.createPedido(
        req.user.id,
        depositoId,
        items,
      );
      res.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const pedidos = await pedidoService.getAllPedidos(
      req.user.id,
      req.user.tipo,
    );
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const pedido = await pedidoService.getPedidoById(req.params.id);
    res.json(pedido);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id/status",
  authMiddleware,
  requireRole("deposito"),
  async (req, res, next) => {
    try {
      const { estado } = req.body;
      const pedido = await pedidoService.updatePedidoStatus(
        req.params.id,
        estado,
      );
      res.json(pedido);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;

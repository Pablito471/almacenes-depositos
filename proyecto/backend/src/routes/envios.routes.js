const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const envioService = require("../services/envioService");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole("envios"),
  async (req, res, next) => {
    try {
      const { pedidoId } = req.body;
      const envio = await envioService.createEnvio(pedidoId);
      res.status(201).json(envio);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/",
  authMiddleware,
  requireRole("envios"),
  async (req, res, next) => {
    try {
      const envios = await envioService.getAllEnvios();
      res.json(envios);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const envio = await envioService.getEnvioById(req.params.id);
    res.json(envio);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id/status",
  authMiddleware,
  requireRole("envios"),
  async (req, res, next) => {
    try {
      const { estado } = req.body;
      const envio = await envioService.updateEnvioStatus(req.params.id, estado);
      res.json(envio);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;

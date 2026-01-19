const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const depositoService = require("../services/depositoService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const depositos = await depositoService.getAllDepositos();
    res.json(depositos);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const deposito = await depositoService.getDepositoById(req.params.id);
    res.json(deposito);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authMiddleware,
  requireRole("deposito"),
  async (req, res, next) => {
    try {
      const deposito = await depositoService.createDeposito(req.body);
      res.status(201).json(deposito);
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
      const deposito = await depositoService.updateDeposito(
        req.params.id,
        req.body,
      );
      res.json(deposito);
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
      await depositoService.deleteDeposito(req.params.id);
      res.json({ message: "Depósito eliminado" });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;

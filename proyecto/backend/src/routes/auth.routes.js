const express = require("express");
const { registerUser, loginUser } = require("../services/authService");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, nombre, tipo, deposito } = req.body;
    const user = await registerUser(email, password, nombre, tipo, deposito);
    res.status(201).json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;

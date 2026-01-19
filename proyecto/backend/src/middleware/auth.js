const { verifyToken } = require("../utils/auth");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (!roles.includes(req.user.tipo)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
};

module.exports = { authMiddleware, requireRole };

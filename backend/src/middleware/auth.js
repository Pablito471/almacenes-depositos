import { verifyToken } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Error en autenticación" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ error: "Acceso denegado. Solo administradores" });
  }
  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: "Rol no autorizado" });
    }
    next();
  };
};

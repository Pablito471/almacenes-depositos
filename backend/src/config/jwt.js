import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "tu-clave-secreta-super-segura-2026";
const JWT_EXPIRATION = "7d";

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { JWT_SECRET };

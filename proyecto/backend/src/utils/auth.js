const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const verifyPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, tipo: user.tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
};

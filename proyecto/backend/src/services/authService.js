const Usuario = require("../models/Usuario");
const Deposito = require("../models/Deposito");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../utils/auth");

const registerUser = async (
  email,
  password,
  nombre,
  tipo,
  depositoInfo = null,
) => {
  const existingUser = await Usuario.findOne({ where: { email } });
  if (existingUser) throw new Error("El email ya está registrado");

  const hashedPassword = await hashPassword(password);
  const user = await Usuario.create({
    email,
    password: hashedPassword,
    nombre,
    tipo,
  });

  if (tipo === "deposito" && depositoInfo) {
    await Deposito.create({
      usuarioId: user.id,
      nombre: depositoInfo.nombre,
      ubicacion: depositoInfo.ubicacion,
      ciudad: depositoInfo.ciudad,
      telefono: depositoInfo.telefono,
    });
  }

  return user;
};

const loginUser = async (email, password) => {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const validPassword = await verifyPassword(password, user.password);
  if (!validPassword) throw new Error("Credenciales inválidas");

  const token = generateToken(user);
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      tipo: user.tipo,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};

const Envio = require("../models/Envio");
const Pedido = require("../models/Pedido");

const generateTrackingNumber = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "TRK-" + Date.now() + "-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const createEnvio = async (pedidoId) => {
  const pedido = await Pedido.findByPk(pedidoId);
  if (!pedido) throw new Error("Pedido no encontrado");

  const numeroSeguimiento = generateTrackingNumber();
  const envio = await Envio.create({
    numeroSeguimiento,
    pedidoId,
    estado: "pendiente",
  });

  await pedido.update({ estado: "enviado" });
  return envio;
};

const getAllEnvios = async () => {
  return await Envio.findAll({ include: [Pedido] });
};

const getEnvioById = async (id) => {
  const envio = await Envio.findByPk(id, { include: [Pedido] });
  if (!envio) throw new Error("Envío no encontrado");
  return envio;
};

const updateEnvioStatus = async (id, estado) => {
  const envio = await getEnvioById(id);
  const updatedEnvio = await envio.update({ estado });

  if (estado === "entregado") {
    await updatedEnvio.Pedido.update({ estado: "entregado" });
  }

  return updatedEnvio;
};

module.exports = {
  createEnvio,
  getAllEnvios,
  getEnvioById,
  updateEnvioStatus,
};

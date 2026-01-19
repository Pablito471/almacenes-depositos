const Deposito = require("../models/Deposito");

const getAllDepositos = async () => {
  return await Deposito.findAll();
};

const getDepositoById = async (id) => {
  const deposito = await Deposito.findByPk(id);
  if (!deposito) throw new Error("Depósito no encontrado");
  return deposito;
};

const createDeposito = async (data) => {
  return await Deposito.create(data);
};

const updateDeposito = async (id, data) => {
  const deposito = await getDepositoById(id);
  return await deposito.update(data);
};

const deleteDeposito = async (id) => {
  const deposito = await getDepositoById(id);
  await deposito.destroy();
  return { message: "Depósito eliminado" };
};

module.exports = {
  getAllDepositos,
  getDepositoById,
  createDeposito,
  updateDeposito,
  deleteDeposito,
};

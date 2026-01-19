const Producto = require("../models/Producto");
const Deposito = require("../models/Deposito");

const createProducto = async (depositoId, data) => {
  await Deposito.findByPk(depositoId);
  return await Producto.create({
    ...data,
    depositoId,
  });
};

const getProductosByDeposito = async (depositoId) => {
  return await Producto.findAll({ where: { depositoId } });
};

const getProductoById = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error("Producto no encontrado");
  return producto;
};

const updateProducto = async (id, data) => {
  const producto = await getProductoById(id);
  return await producto.update(data);
};

const deleteProducto = async (id) => {
  const producto = await getProductoById(id);
  await producto.destroy();
  return { message: "Producto eliminado" };
};

module.exports = {
  createProducto,
  getProductosByDeposito,
  getProductoById,
  updateProducto,
  deleteProducto,
};

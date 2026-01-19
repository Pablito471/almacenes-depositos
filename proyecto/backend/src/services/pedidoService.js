const Pedido = require("../models/Pedido");
const ItemPedido = require("../models/ItemPedido");
const Producto = require("../models/Producto");
const Usuario = require("../models/Usuario");

const generatePedidoNumber = () => {
  return `PED-${Date.now()}`;
};

const createPedido = async (clienteId, depositoId, items) => {
  const numero = generatePedidoNumber();
  let total = 0;

  const pedido = await Pedido.create({
    numero,
    clienteId,
    depositoId,
    estado: "pendiente",
  });

  for (const item of items) {
    const producto = await Producto.findByPk(item.productoId);
    if (!producto) throw new Error(`Producto ${item.productoId} no encontrado`);

    if (producto.stock < item.cantidad) {
      throw new Error(`Stock insuficiente para ${producto.nombre}`);
    }

    await ItemPedido.create({
      pedidoId: pedido.id,
      productoId: item.productoId,
      cantidad: item.cantidad,
      precioUnitario: producto.precio,
    });

    await producto.update({
      stock: producto.stock - item.cantidad,
    });

    total += producto.precio * item.cantidad;
  }

  await pedido.update({ total });
  return pedido;
};

const getAllPedidos = async (userId, userType) => {
  if (userType === "cliente") {
    return await Pedido.findAll({
      where: { clienteId: userId },
      include: [{ model: ItemPedido, include: [Producto] }],
    });
  } else if (userType === "deposito") {
    const deposito = await Deposito.findOne({ where: { usuarioId: userId } });
    if (!deposito) return [];
    return await Pedido.findAll({
      where: { depositoId: deposito.id },
      include: [{ model: ItemPedido, include: [Producto] }],
    });
  }
  return [];
};

const getPedidoById = async (id) => {
  const pedido = await Pedido.findByPk(id, {
    include: [{ model: ItemPedido, include: [Producto] }],
  });
  if (!pedido) throw new Error("Pedido no encontrado");
  return pedido;
};

const updatePedidoStatus = async (id, estado) => {
  const pedido = await getPedidoById(id);
  return await pedido.update({ estado });
};

module.exports = {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedidoStatus,
};

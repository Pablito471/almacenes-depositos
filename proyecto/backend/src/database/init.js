const sequelize = require("./connection");
const Usuario = require("../models/Usuario");
const Deposito = require("../models/Deposito");
const Producto = require("../models/Producto");
const Pedido = require("../models/Pedido");
const ItemPedido = require("../models/ItemPedido");
const Envio = require("../models/Envio");

const initializeDatabase = async () => {
  try {
    // Relaciones
    Usuario.hasOne(Deposito, { foreignKey: "usuarioId", onDelete: "CASCADE" });
    Deposito.belongsTo(Usuario, { foreignKey: "usuarioId" });

    Deposito.hasMany(Producto, {
      foreignKey: "depositoId",
      onDelete: "CASCADE",
    });
    Producto.belongsTo(Deposito, { foreignKey: "depositoId" });

    Usuario.hasMany(Pedido, { foreignKey: "clienteId", onDelete: "CASCADE" });
    Pedido.belongsTo(Usuario, { foreignKey: "clienteId", as: "cliente" });

    Deposito.hasMany(Pedido, {
      foreignKey: "depositoId",
      onDelete: "SET NULL",
    });
    Pedido.belongsTo(Deposito, { foreignKey: "depositoId" });

    Pedido.hasMany(ItemPedido, { foreignKey: "pedidoId", onDelete: "CASCADE" });
    ItemPedido.belongsTo(Pedido, { foreignKey: "pedidoId" });

    Producto.hasMany(ItemPedido, {
      foreignKey: "productoId",
      onDelete: "CASCADE",
    });
    ItemPedido.belongsTo(Producto, { foreignKey: "productoId" });

    Pedido.hasMany(Envio, { foreignKey: "pedidoId", onDelete: "CASCADE" });
    Envio.belongsTo(Pedido, { foreignKey: "pedidoId" });

    // Sincronizar base de datos
    await sequelize.sync({ alter: true });
    console.log("✅ Base de datos sincronizada correctamente");

    return sequelize;
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error.message);
    process.exit(1);
  }
};

module.exports = initializeDatabase;

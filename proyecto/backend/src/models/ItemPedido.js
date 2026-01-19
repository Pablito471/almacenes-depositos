const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const ItemPedido = sequelize.define(
  "ItemPedido",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "items_pedidos",
  },
);

module.exports = ItemPedido;

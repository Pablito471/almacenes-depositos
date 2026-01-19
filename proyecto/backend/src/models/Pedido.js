const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Pedido = sequelize.define(
  "Pedido",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(
        "pendiente",
        "confirmado",
        "preparado",
        "listo_envio",
        "enviado",
        "entregado",
        "cancelado",
      ),
      defaultValue: "pendiente",
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    direccionEntrega: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "pedidos",
  },
);

module.exports = Pedido;

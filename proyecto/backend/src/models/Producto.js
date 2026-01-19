const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Producto = sequelize.define(
  "Producto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "productos",
  },
);

module.exports = Producto;

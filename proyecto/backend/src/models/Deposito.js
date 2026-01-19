const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Deposito = sequelize.define(
  "Deposito",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "depositos",
  },
);

module.exports = Deposito;

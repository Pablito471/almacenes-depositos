const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Envio = sequelize.define(
  "Envio",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numeroSeguimiento: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(
        "pendiente",
        "recogido",
        "en_transito",
        "entregado",
        "devuelto",
      ),
      defaultValue: "pendiente",
    },
    fechaSalida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fechaEntrega: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "envios",
  },
);

module.exports = Envio;

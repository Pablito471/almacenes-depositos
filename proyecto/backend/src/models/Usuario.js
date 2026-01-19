const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.ENUM("cliente", "deposito", "envios"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "usuarios",
  },
);

module.exports = Usuario;

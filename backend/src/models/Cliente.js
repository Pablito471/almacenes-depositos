import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";

const Cliente = sequelize.define(
  "Cliente",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    empresa: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo", "suspendido"),
      defaultValue: "activo",
    },
    usuarioId: {
      type: DataTypes.UUID,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    paranoid: false,
  },
);

// Asociación
Cliente.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });

export default Cliente;

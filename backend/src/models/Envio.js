import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";

const Envio = sequelize.define(
  "Envio",
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
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    ciudad: {
      type: DataTypes.STRING,
    },
    licencia: {
      type: DataTypes.STRING,
    },
    tipoVehiculo: {
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
Envio.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });

export default Envio;

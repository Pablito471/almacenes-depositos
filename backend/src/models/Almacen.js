import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";

const Almacen = sequelize.define(
  "Almacen",
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
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.STRING,
    },
    responsable: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.TEXT, // Base64 encoded image
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo", "mantenimiento"),
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
Almacen.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });

export default Almacen;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Almacen from "./Almacen.js";

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
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    almacenId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Almacen,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.ENUM("disponible", "agotado", "descontinuado"),
      defaultValue: "disponible",
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
Producto.belongsTo(Almacen, { foreignKey: "almacenId", as: "almacen" });

export default Producto;

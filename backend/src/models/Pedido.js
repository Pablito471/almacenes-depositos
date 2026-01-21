import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Cliente from "./Cliente.js";
import Almacen from "./Almacen.js";
import Envio from "./Envio.js";

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
    },
    clienteId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
    },
    almacenId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Almacen,
        key: "id",
      },
    },
    envioId: {
      type: DataTypes.UUID,
      references: {
        model: Envio,
        key: "id",
      },
    },
    productos: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM(
        "pendiente",
        "confirmado",
        "preparando",
        "listo",
        "enviado",
        "entregado",
        "cancelado",
      ),
      defaultValue: "pendiente",
    },
    fechaEntrega: {
      type: DataTypes.DATE,
    },
    observaciones: {
      type: DataTypes.TEXT,
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

// Asociaciones
Pedido.belongsTo(Cliente, { foreignKey: "clienteId", as: "cliente" });
Pedido.belongsTo(Almacen, { foreignKey: "almacenId", as: "almacen" });
Pedido.belongsTo(Envio, { foreignKey: "envioId", as: "envio" });

// Hook para generar número de pedido automático
Pedido.beforeCreate(async (pedido) => {
  if (!pedido.numero) {
    const count = await Pedido.count();
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    pedido.numero = `PED-${fecha}-${String(count + 1).padStart(4, "0")}`;
  }
});

export default Pedido;

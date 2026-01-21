import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcryptjs from "bcryptjs";

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
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("cliente", "deposito", "envios", "admin"),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

// Hash password antes de guardar
Usuario.beforeCreate(async (usuario) => {
  usuario.password = await bcryptjs.hash(usuario.password, 10);
});

Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed("password")) {
    usuario.password = await bcryptjs.hash(usuario.password, 10);
  }
});

// Método para comparar contraseña
Usuario.prototype.compararPassword = async function (passwordIngresada) {
  return await bcryptjs.compare(passwordIngresada, this.password);
};

export default Usuario;

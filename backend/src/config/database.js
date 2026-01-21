import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "almacenes_depositos",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ PostgreSQL conectado exitosamente");

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✓ Modelos sincronizados");

    return true;
  } catch (error) {
    console.error("✗ Error al conectar PostgreSQL:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };

import Envio from "../models/Envio.js";
import Usuario from "../models/Usuario.js";

// Crear envío
export const crearEnvio = async (req, res) => {
  try {
    const {
      nombre,
      empresa,
      telefono,
      email,
      ciudad,
      licencia,
      tipoVehiculo,
      estado,
    } = req.body;

    if (!nombre || !empresa) {
      return res.status(400).json({ error: "Nombre y empresa son requeridos" });
    }

    const nuevoEnvio = await Envio.create({
      nombre,
      empresa,
      telefono,
      email,
      ciudad,
      licencia,
      tipoVehiculo,
      estado: estado || "activo",
      usuarioId: req.userId,
    });

    const envioConUsuario = await Envio.findByPk(nuevoEnvio.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Envío creado exitosamente",
      envio: envioConUsuario,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear envío" });
  }
};

// Obtener todos los envíos
export const obtenerEnvios = async (req, res) => {
  try {
    const envios = await Envio.findAll({
      where: { deletedAt: null },
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    res.json({
      success: true,
      envios,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener envíos" });
  }
};

// Obtener envío por ID
export const obtenerEnvioPorId = async (req, res) => {
  try {
    const envio = await Envio.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    if (!envio) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    res.json({
      success: true,
      envio,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener envío" });
  }
};

// Actualizar envío
export const actualizarEnvio = async (req, res) => {
  try {
    const {
      nombre,
      empresa,
      telefono,
      email,
      ciudad,
      licencia,
      tipoVehiculo,
      estado,
    } = req.body;

    const envio = await Envio.findByPk(req.params.id);

    if (!envio) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    await envio.update({
      nombre,
      empresa,
      telefono,
      email,
      ciudad,
      licencia,
      tipoVehiculo,
      estado,
    });

    const envioActualizado = await Envio.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    res.json({
      success: true,
      message: "Envío actualizado exitosamente",
      envio: envioActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar envío" });
  }
};

// Eliminar envío (soft delete)
export const eliminarEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByPk(req.params.id);

    if (!envio) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    await envio.update({ deletedAt: new Date() });

    res.json({
      success: true,
      message: "Envío eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar envío" });
  }
};

// Restaurar envío
export const restaurarEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByPk(req.params.id);

    if (!envio) {
      return res.status(404).json({ error: "Envío no encontrado" });
    }

    await envio.update({ deletedAt: null });

    const envioRestaurado = await Envio.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    res.json({
      success: true,
      message: "Envío restaurado exitosamente",
      envio: envioRestaurado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al restaurar envío" });
  }
};

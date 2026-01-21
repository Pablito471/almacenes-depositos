import Almacen from "../models/Almacen.js";
import Usuario from "../models/Usuario.js";

// Crear almacén
export const crearAlmacen = async (req, res) => {
  try {
    const {
      nombre,
      ubicacion,
      capacidad,
      responsable,
      telefono,
      email,
      foto,
      estado,
    } = req.body;

    if (!nombre || !ubicacion) {
      return res
        .status(400)
        .json({ error: "Nombre y ubicación son requeridos" });
    }

    const nuevoAlmacen = await Almacen.create({
      nombre,
      ubicacion,
      capacidad,
      responsable,
      telefono,
      email,
      foto,
      estado: estado || "activo",
      usuarioId: req.userId,
    });

    const almacenConUsuario = await Almacen.findByPk(nuevoAlmacen.id, {
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
      message: "Almacén creado exitosamente",
      almacen: almacenConUsuario,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear almacén" });
  }
};

// Obtener todos los almacenes
export const obtenerAlmacenes = async (req, res) => {
  try {
    const almacenes = await Almacen.findAll({
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
      almacenes,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener almacenes" });
  }
};

// Obtener almacén por ID
export const obtenerAlmacenPorId = async (req, res) => {
  try {
    const almacen = await Almacen.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    if (!almacen) {
      return res.status(404).json({ error: "Almacén no encontrado" });
    }

    res.json({
      success: true,
      almacen,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener almacén" });
  }
};

// Actualizar almacén
export const actualizarAlmacen = async (req, res) => {
  try {
    const {
      nombre,
      ubicacion,
      capacidad,
      responsable,
      telefono,
      email,
      foto,
      estado,
    } = req.body;

    const almacen = await Almacen.findByPk(req.params.id);

    if (!almacen) {
      return res.status(404).json({ error: "Almacén no encontrado" });
    }

    await almacen.update({
      nombre,
      ubicacion,
      capacidad,
      responsable,
      telefono,
      email,
      foto,
      estado,
    });

    const almacenActualizado = await Almacen.findByPk(req.params.id, {
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
      message: "Almacén actualizado exitosamente",
      almacen: almacenActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar almacén" });
  }
};

// Eliminar almacén (soft delete)
export const eliminarAlmacen = async (req, res) => {
  try {
    const almacen = await Almacen.findByPk(req.params.id);

    if (!almacen) {
      return res.status(404).json({ error: "Almacén no encontrado" });
    }

    await almacen.update({ deletedAt: new Date() });

    res.json({
      success: true,
      message: "Almacén eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar almacén" });
  }
};

// Restaurar almacén
export const restaurarAlmacen = async (req, res) => {
  try {
    const almacen = await Almacen.findByPk(req.params.id);

    if (!almacen) {
      return res.status(404).json({ error: "Almacén no encontrado" });
    }

    await almacen.update({ deletedAt: null });

    const almacenRestaurado = await Almacen.findByPk(req.params.id, {
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
      message: "Almacén restaurado exitosamente",
      almacen: almacenRestaurado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al restaurar almacén" });
  }
};

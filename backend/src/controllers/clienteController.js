import Cliente from "../models/Cliente.js";
import Usuario from "../models/Usuario.js";

// Crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, empresa, estado } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: "Nombre y email son requeridos" });
    }

    const nuevoCliente = await Cliente.create({
      nombre,
      email,
      telefono,
      empresa,
      estado: estado || "activo",
      usuarioId: req.userId,
    });

    const clienteConUsuario = await Cliente.findByPk(nuevoCliente.id, {
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
      message: "Cliente creado exitosamente",
      cliente: clienteConUsuario,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
};

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
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
      clientes,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Obtener cliente por ID
export const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "email", "nombre"],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({
      success: true,
      cliente,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cliente" });
  }
};

// Actualizar cliente
export const actualizarCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, empresa, estado } = req.body;

    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await cliente.update({ nombre, email, telefono, empresa, estado });

    const clienteActualizado = await Cliente.findByPk(req.params.id, {
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
      message: "Cliente actualizado exitosamente",
      cliente: clienteActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Eliminar cliente (soft delete)
export const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await cliente.update({ deletedAt: new Date() });

    res.json({
      success: true,
      message: "Cliente eliminado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

// Restaurar cliente
export const restaurarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await cliente.update({ deletedAt: null });

    const clienteRestaurado = await Cliente.findByPk(req.params.id, {
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
      message: "Cliente restaurado exitosamente",
      cliente: clienteRestaurado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al restaurar cliente" });
  }
};

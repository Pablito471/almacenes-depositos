import Usuario from "../models/Usuario.js";
import Cliente from "../models/Cliente.js";
import { generateToken } from "../config/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, password, nombre, role } = req.body;

    // Validar campos requeridos
    if (!email || !password || !nombre || !role) {
      return res.status(400).json({ error: "Campos requeridos" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Crear nuevo usuario (password se hashea automáticamente en el hook)
    const nuevoUsuario = await Usuario.create({
      email,
      password,
      nombre,
      role,
    });

    // Si es cliente, crear registro en tabla Cliente
    if (role === "cliente") {
      await Cliente.create({
        nombre,
        email,
        usuarioId: nuevoUsuario.id,
      });
    }

    // Generar token
    const token = generateToken(nuevoUsuario.id, role);

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        nombre: nuevoUsuario.nombre,
        role: nuevoUsuario.role,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const passwordValida = await usuario.compararPassword(password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo || usuario.deletedAt) {
      return res.status(401).json({ error: "Usuario inactivo" });
    }

    // Generar token
    const token = generateToken(usuario.id, usuario.role);

    res.json({
      success: true,
      message: "Sesión iniciada exitosamente",
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const logout = (req, res) => {
  // El logout se maneja en el cliente eliminando el token
  res.json({ success: true, message: "Sesión cerrada" });
};

export const getProfile = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      success: true,
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        role: usuario.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

# 🔌 Guía de Integración con API - Panel de Administración

## Descripción

Este documento muestra cómo integrar el panel de administración con una API backend para persistencia de datos en base de datos.

## 📚 Estructura Actual

Actualmente, los datos se almacenan en React Context (memoria volátil). Para persistencia, necesitamos:

1. **Crear API endpoints** en el backend
2. **Actualizar AdminContext** para llamar a la API
3. **Implementar manejo de errores** y estados de carga

## 🔧 Paso 1: Crear Servicio de API

### Archivo: `src/services/adminService.js` (NUEVO)

```javascript
// Configuración base
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ==================== CLIENTES ====================

export const clientesService = {
  // Obtener todos los clientes
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/admin/clientes`);
    if (!res.ok) throw new Error("Error al obtener clientes");
    return res.json();
  },

  // Crear nuevo cliente
  async create(clienteData) {
    const res = await fetch(`${API_BASE_URL}/admin/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteData),
    });
    if (!res.ok) throw new Error("Error al crear cliente");
    return res.json();
  },

  // Actualizar cliente
  async update(id, clienteData) {
    const res = await fetch(`${API_BASE_URL}/admin/clientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteData),
    });
    if (!res.ok) throw new Error("Error al actualizar cliente");
    return res.json();
  },

  // Eliminar cliente
  async delete(id) {
    const res = await fetch(`${API_BASE_URL}/admin/clientes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar cliente");
    return res.json();
  },
};

// ==================== ALMACENES ====================

export const almacenesService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/admin/almacenes`);
    if (!res.ok) throw new Error("Error al obtener almacenes");
    return res.json();
  },

  async create(almacenData) {
    const res = await fetch(`${API_BASE_URL}/admin/almacenes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(almacenData),
    });
    if (!res.ok) throw new Error("Error al crear almacén");
    return res.json();
  },

  async update(id, almacenData) {
    const res = await fetch(`${API_BASE_URL}/admin/almacenes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(almacenData),
    });
    if (!res.ok) throw new Error("Error al actualizar almacén");
    return res.json();
  },

  async delete(id) {
    const res = await fetch(`${API_BASE_URL}/admin/almacenes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar almacén");
    return res.json();
  },
};

// ==================== FLETES ====================

export const fletesService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/admin/fletes`);
    if (!res.ok) throw new Error("Error al obtener fletes");
    return res.json();
  },

  async create(fleteData) {
    const res = await fetch(`${API_BASE_URL}/admin/fletes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fleteData),
    });
    if (!res.ok) throw new Error("Error al crear flete");
    return res.json();
  },

  async update(id, fleteData) {
    const res = await fetch(`${API_BASE_URL}/admin/fletes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fleteData),
    });
    if (!res.ok) throw new Error("Error al actualizar flete");
    return res.json();
  },

  async delete(id) {
    const res = await fetch(`${API_BASE_URL}/admin/fletes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar flete");
    return res.json();
  },
};
```

## 🔄 Paso 2: Actualizar AdminContext

### Archivo: `src/context/AdminContext.jsx` (MODIFICADO)

```javascript
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  clientesService,
  almacenesService,
  fletesService,
} from "@/services/adminService";
import { alerts } from "@/utils/alerts";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [clientes, setClientes] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [fletes, setFletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [clientesData, almacenesData, fletesData] = await Promise.all([
        clientesService.getAll(),
        almacenesService.getAll(),
        fletesService.getAll(),
      ]);

      setClientes(clientesData);
      setAlmacenes(almacenesData);
      setFletes(fletesData);
      setError(null);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError(err.message);
      alerts.error("Error", "No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  // ==================== CLIENTES ====================

  const addCliente = useCallback(async (cliente) => {
    try {
      setLoading(true);
      const nuevoCliente = await clientesService.create(cliente);
      setClientes((prev) => [...prev, nuevoCliente]);
      alerts.success("Éxito", "Cliente creado correctamente");
      return nuevoCliente;
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCliente = useCallback(async (id, clienteActualizado) => {
    try {
      setLoading(true);
      const resultado = await clientesService.update(id, clienteActualizado);
      setClientes((prev) =>
        prev.map((cliente) => (cliente.id === id ? resultado : cliente)),
      );
      alerts.success("Éxito", "Cliente actualizado correctamente");
      return resultado;
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCliente = useCallback(async (id) => {
    try {
      setLoading(true);
      await clientesService.delete(id);
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
      alerts.success("Éxito", "Cliente eliminado correctamente");
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== ALMACENES ====================

  const addAlmacen = useCallback(async (almacen) => {
    try {
      setLoading(true);
      const nuevoAlmacen = await almacenesService.create(almacen);
      setAlmacenes((prev) => [...prev, nuevoAlmacen]);
      alerts.success("Éxito", "Almacén creado correctamente");
      return nuevoAlmacen;
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAlmacen = useCallback(async (id, almacenActualizado) => {
    try {
      setLoading(true);
      const resultado = await almacenesService.update(id, almacenActualizado);
      setAlmacenes((prev) =>
        prev.map((almacen) => (almacen.id === id ? resultado : almacen)),
      );
      alerts.success("Éxito", "Almacén actualizado correctamente");
      return resultado;
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAlmacen = useCallback(async (id) => {
    try {
      setLoading(true);
      await almacenesService.delete(id);
      setAlmacenes((prev) => prev.filter((almacen) => almacen.id !== id));
      alerts.success("Éxito", "Almacén eliminado correctamente");
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== FLETES ====================

  const addFlete = useCallback(async (flete) => {
    try {
      setLoading(true);
      const nuevoFlete = await fletesService.create(flete);
      setFletes((prev) => [...prev, nuevoFlete]);
      alerts.success("Éxito", "Flete creado correctamente");
      return nuevoFlete;
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFlete = useCallback(async (id, fleteActualizado) => {
    try {
      setLoading(true);
      const resultado = await fletesService.update(id, fleteActualizado);
      setFletes((prev) =>
        prev.map((flete) => (flete.id === id ? resultado : flete)),
      );
      alerts.success("Éxito", "Flete actualizado correctamente");
      return resultado;
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFlete = useCallback(async (id) => {
    try {
      setLoading(true);
      await fletesService.delete(id);
      setFletes((prev) => prev.filter((flete) => flete.id !== id));
      alerts.success("Éxito", "Flete eliminado correctamente");
    } catch (err) {
      alerts.error("Error", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    // Clientes
    clientes,
    addCliente,
    updateCliente,
    deleteCliente,
    // Almacenes
    almacenes,
    addAlmacen,
    updateAlmacen,
    deleteAlmacen,
    // Fletes
    fletes,
    addFlete,
    updateFlete,
    deleteFlete,
    // General
    loading,
    error,
    loadAllData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe ser usado dentro de AdminProvider");
  }
  return context;
}
```

## 🛠️ Paso 3: Endpoints Backend Requeridos

### Express.js Ejemplo

```javascript
// routes/admin.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// Verificar autenticación y rol admin
router.use(authMiddleware);
router.use(adminMiddleware);

// ==================== CLIENTES ====================

router.get("/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/clientes", async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/clientes/:id", async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: "Cliente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ALMACENES ====================

router.get("/almacenes", async (req, res) => {
  try {
    const almacenes = await Almacen.find();
    res.json(almacenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/almacenes", async (req, res) => {
  try {
    const almacen = new Almacen(req.body);
    await almacen.save();
    res.status(201).json(almacen);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/almacenes/:id", async (req, res) => {
  try {
    const almacen = await Almacen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(almacen);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/almacenes/:id", async (req, res) => {
  try {
    await Almacen.findByIdAndDelete(req.params.id);
    res.json({ message: "Almacén eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== FLETES ====================

router.get("/fletes", async (req, res) => {
  try {
    const fletes = await Flete.find();
    res.json(fletes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/fletes", async (req, res) => {
  try {
    const flete = new Flete(req.body);
    await flete.save();
    res.status(201).json(flete);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/fletes/:id", async (req, res) => {
  try {
    const flete = await Flete.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(flete);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/fletes/:id", async (req, res) => {
  try {
    await Flete.findByIdAndDelete(req.params.id);
    res.json({ message: "Flete eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

## ⚙️ Variables de Entorno

### `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### `.env.production`

```bash
NEXT_PUBLIC_API_URL=https://api.midominio.com
```

## 🔐 Middleware de Autenticación

### Backend

```javascript
// middleware/auth.js
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = verifyToken;

// middleware/admin.js
const checkAdminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
};

module.exports = checkAdminRole;
```

## 📋 Esquemas MongoDB Ejemplo

```javascript
// models/Cliente.js
const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: String,
    empresa: String,
    ciudad: String,
    estado: {
      type: String,
      enum: ["activo", "inactivo", "suspendido"],
      default: "activo",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cliente", clienteSchema);

// models/Almacen.js
const almacenSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    capacidad: String,
    responsable: String,
    telefono: String,
    email: String,
    estado: {
      type: String,
      enum: ["activo", "inactivo", "mantenimiento"],
      default: "activo",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Almacen", almacenSchema);

// models/Flete.js
const fleteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    empresa: { type: String, required: true },
    telefono: String,
    email: String,
    ciudad: String,
    licencia: String,
    tipoVehiculo: {
      type: String,
      enum: ["auto", "camioneta", "camion", "moto"],
    },
    estado: {
      type: String,
      enum: ["activo", "inactivo", "suspendido"],
      default: "activo",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Flete", fleteSchema);
```

## 🚀 Pasos para Implementar

1. **Crear archivo `src/services/adminService.js`** con el código del Paso 1
2. **Configurar variables de entorno** en `.env.local`
3. **Actualizar `src/context/AdminContext.jsx`** con el código del Paso 2
4. **Crear endpoints en el backend** (Paso 3)
5. **Crear modelos en la base de datos** (schemas)
6. **Probar cada operación CRUD**

## ✅ Checklist de Implementación

- [ ] Crear servicio de API (adminService.js)
- [ ] Configurar variables de entorno
- [ ] Actualizar AdminContext con llamadas a API
- [ ] Crear endpoints GET /admin/clientes
- [ ] Crear endpoint POST /admin/clientes
- [ ] Crear endpoint PUT /admin/clientes/:id
- [ ] Crear endpoint DELETE /admin/clientes/:id
- [ ] Repetir para almacenes
- [ ] Repetir para fletes
- [ ] Agregar autenticación y autorización
- [ ] Probar CRUD completo
- [ ] Agregar manejo de errores
- [ ] Agregar validaciones

## 🐛 Manejo de Errores

```javascript
// Actualizar formularios para manejar errores de API
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    if (clienteActual) {
      await updateCliente(clienteActual.id, formData);
    } else {
      await addCliente(formData);
    }
    onClose();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Ocurrió un error",
    });
  } finally {
    setLoading(false);
  }
};
```

---

**Actualizado**: 21 de enero de 2026
**Versión**: 1.0

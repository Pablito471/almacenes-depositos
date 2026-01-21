# 🔗 Guía de Integración Frontend-Backend

## Configuración Base

### 1. Crear archivo de configuración API

**`src/config/api.js`**

```javascript
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  // Auth
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    profile: `${API_BASE_URL}/auth/profile`,
  },

  // Clientes
  clientes: {
    list: `${API_BASE_URL}/clientes`,
    create: `${API_BASE_URL}/clientes`,
    get: (id) => `${API_BASE_URL}/clientes/${id}`,
    update: (id) => `${API_BASE_URL}/clientes/${id}`,
    delete: (id) => `${API_BASE_URL}/clientes/${id}`,
    restore: (id) => `${API_BASE_URL}/clientes/${id}/restore`,
  },

  // Almacenes
  almacenes: {
    list: `${API_BASE_URL}/almacenes`,
    create: `${API_BASE_URL}/almacenes`,
    get: (id) => `${API_BASE_URL}/almacenes/${id}`,
    update: (id) => `${API_BASE_URL}/almacenes/${id}`,
    delete: (id) => `${API_BASE_URL}/almacenes/${id}`,
    restore: (id) => `${API_BASE_URL}/almacenes/${id}/restore`,
  },

  // Envíos
  envios: {
    list: `${API_BASE_URL}/envios`,
    create: `${API_BASE_URL}/envios`,
    get: (id) => `${API_BASE_URL}/envios/${id}`,
    update: (id) => `${API_BASE_URL}/envios/${id}`,
    delete: (id) => `${API_BASE_URL}/envios/${id}`,
    restore: (id) => `${API_BASE_URL}/envios/${id}/restore`,
  },
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem("token");
      window.location.href = "/pages/auth/login";
    }
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
```

### 2. Agregar a `next.config.mjs`

```javascript
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  },
};

export default nextConfig;
```

---

## Ejemplos de Uso en Context

### Actualizar `AuthContext.jsx`

```javascript
import { createContext, useContext, useState, useEffect } from "react";
import { api, fetchWithAuth } from "@/config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registrar
  const register = async (email, password, nombre, role) => {
    try {
      const data = await fetch(api.auth.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre, role }),
      }).then((r) => r.json());

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data;
      }
      throw new Error(data.error);
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const data = await fetch(api.auth.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((r) => r.json());

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data;
      }
      throw new Error(data.error);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Obtener perfil
  const getProfile = async () => {
    try {
      const data = await fetchWithAuth(api.auth.profile);
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Verificar token al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## Ejemplos de Controladores en Componentes

### Crear Cliente

```javascript
import { useState } from "react";
import { api, fetchWithAuth } from "@/config/api";

export default function CreateClientForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const cliente = {
        nombre: formData.get("nombre"),
        email: formData.get("email"),
        telefono: formData.get("telefono"),
        empresa: formData.get("empresa"),
        estado: "activo",
      };

      const result = await fetchWithAuth(api.clientes.create, {
        method: "POST",
        body: JSON.stringify(cliente),
      });

      console.log("Cliente creado:", result.cliente);
      // Reload lista o actualizar context
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="telefono" placeholder="Teléfono" />
      <input name="empresa" placeholder="Empresa" />
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Crear Cliente"}
      </button>
    </form>
  );
}
```

### Listar Clientes

```javascript
import { useEffect, useState } from "react";
import { api, fetchWithAuth } from "@/config/api";

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await fetchWithAuth(api.clientes.list);
        setClientes(data.clientes);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {clientes.map((cliente) => (
        <div key={cliente.id}>
          <h3>{cliente.nombre}</h3>
          <p>Email: {cliente.email}</p>
          <p>Empresa: {cliente.empresa}</p>
        </div>
      ))}
    </div>
  );
}
```

### Actualizar Almacén con Foto

```javascript
import { useState } from "react";
import { api, fetchWithAuth } from "@/config/api";

export default function UpdateAlmacenForm({ almacenId }) {
  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const almacen = {
        nombre: formData.get("nombre"),
        ubicacion: formData.get("ubicacion"),
        capacidad: formData.get("capacidad"),
        responsable: formData.get("responsable"),
        telefono: formData.get("telefono"),
        email: formData.get("email"),
        foto: foto,
        estado: formData.get("estado"),
      };

      const result = await fetchWithAuth(api.almacenes.update(almacenId), {
        method: "PUT",
        body: JSON.stringify(almacen),
      });

      console.log("Almacén actualizado:", result.almacen);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" required />
      <input name="ubicacion" placeholder="Ubicación" required />
      <input name="capacidad" placeholder="Capacidad" />
      <input name="responsable" placeholder="Responsable" />
      <input name="telefono" placeholder="Teléfono" />
      <input name="email" type="email" placeholder="Email" />

      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {foto && <img src={foto} alt="Preview" style={{ maxWidth: "200px" }} />}

      <select name="estado" defaultValue="activo">
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
        <option value="mantenimiento">Mantenimiento</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Actualizar Almacén"}
      </button>
    </form>
  );
}
```

### Eliminar (Soft Delete)

```javascript
const handleDelete = async (clienteId) => {
  if (confirm("¿Eliminar este cliente?")) {
    try {
      await fetchWithAuth(api.clientes.delete(clienteId), {
        method: "DELETE",
      });
      // Reload lista
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
```

### Restaurar Eliminado

```javascript
const handleRestore = async (clienteId) => {
  try {
    const result = await fetchWithAuth(api.clientes.restore(clienteId), {
      method: "PATCH",
    });
    console.log("Restaurado:", result.cliente);
    // Reload lista
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

---

## Variables de Entorno Frontend

**`.env.local` o `.env`**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Para producción:

```env
NEXT_PUBLIC_API_URL=https://api.tudominio.com/api
```

---

## Notas Importantes

1. **Token JWT**: Se almacena en `localStorage`
2. **CORS**: Backend está configurado para aceptar solicitudes desde frontend
3. **Autenticación**: Todas las rutas admin requieren header `Authorization: Bearer <token>`
4. **Manejo de Errores**: `fetchWithAuth` redirige a login si el token expira
5. **Base64 de Imágenes**: Se envían como strings en el JSON

---

**¡Listo para integrar!** ✅

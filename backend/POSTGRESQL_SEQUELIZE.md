# 🔄 Backend Adaptado a PostgreSQL + Sequelize

## ✅ Cambios Realizados

Se ha migrado **completamente** el backend de **MongoDB + Mongoose** a **PostgreSQL + Sequelize**:

### 1. **Dependencias Actualizadas**

```json
{
  "sequelize": "^6.35.2", // ORM para PostgreSQL
  "pg": "^8.10.0", // Driver PostgreSQL
  "pg-hstore": "^2.3.4" // Soporte para JSON en PostgreSQL
}
```

### 2. **Configuración de Base de Datos**

[database.js](src/config/database.js) - Conecta con PostgreSQL via Sequelize:

- Host, puerto, usuario y contraseña configurables por `.env`
- Auto-sincronización de modelos en desarrollo
- Logging configurable

### 3. **Todos los Modelos Convertidos a Sequelize**

✅ `Usuario.js` - Usuarios con roles y soft-delete
✅ `Cliente.js` - Clientes con referencia a Usuario
✅ `Almacen.js` - Almacenes con soporte de fotos (base64)
✅ `Envio.js` - Envíos con licencia y tipo vehículo
✅ `Producto.js` - Productos con referencia a Almacén
✅ `Pedido.js` - Pedidos con generación automática de número

### 4. **Controladores Actualizados**

- ✅ `authController.js` - Métodos Sequelize
- ✅ `clienteController.js` - CRUD con Sequelize
- ✅ `almacenController.js` - CRUD con Sequelize
- ✅ `envioController.js` - CRUD con Sequelize

### 5. **Características Conservadas**

✅ Soft-delete (eliminación lógica)
✅ Autenticación con JWT
✅ Control de roles
✅ Hash de contraseñas automático
✅ Relaciones entre tablas
✅ Validación de datos

---

## 🔧 Instalación y Configuración

### 1. **Instalar Dependencias**

```bash
cd backend
npm install
```

### 2. **Crear Base de Datos PostgreSQL**

```sql
CREATE DATABASE almacenes_depositos;
```

### 3. **Configurar Variables de Entorno**

Copia `.env.example` a `.env` y actualiza:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=almacenes_depositos
DB_USER=postgres
DB_PASSWORD=tu_contraseña

JWT_SECRET=tu-clave-secreta-2026
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 4. **Iniciar el Servidor**

```bash
npm run dev     # Modo desarrollo (con nodemon)
npm start       # Modo producción
```

Server estará en `http://localhost:5000`

---

## 📊 Estructura de Base de Datos

### Tabla: usuarios

- `id` (UUID, PK)
- `email` (String, unique)
- `password` (String, hasheada)
- `nombre` (String)
- `role` (ENUM: cliente, deposito, envios, admin)
- `activo` (Boolean)
- `deletedAt` (DateTime, soft-delete)
- `createdAt`, `updatedAt`

### Tabla: clientes

- `id` (UUID, PK)
- `nombre` (String)
- `email` (String)
- `telefono` (String)
- `empresa` (String)
- `estado` (ENUM: activo, inactivo, suspendido)
- `usuarioId` (UUID, FK → usuarios)
- `deletedAt` (DateTime)

### Tabla: almacenes

- `id` (UUID, PK)
- `nombre` (String)
- `ubicacion` (String)
- `capacidad` (String)
- `responsable` (String)
- `telefono` (String)
- `email` (String)
- `foto` (TEXT, base64)
- `estado` (ENUM: activo, inactivo, mantenimiento)
- `usuarioId` (UUID, FK)
- `deletedAt` (DateTime)

### Tabla: envios

- `id` (UUID, PK)
- `nombre` (String)
- `empresa` (String)
- `telefono` (String)
- `email` (String)
- `ciudad` (String)
- `licencia` (String)
- `tipoVehiculo` (String)
- `estado` (ENUM: activo, inactivo, suspendido)
- `usuarioId` (UUID, FK)
- `deletedAt` (DateTime)

### Tabla: productos

- `id` (UUID, PK)
- `nombre` (String)
- `descripcion` (TEXT)
- `precio` (DECIMAL)
- `cantidad` (INTEGER)
- `almacenId` (UUID, FK)
- `estado` (ENUM: disponible, agotado, descontinuado)
- `deletedAt` (DateTime)

### Tabla: pedidos

- `id` (UUID, PK)
- `numero` (String, auto-generado)
- `clienteId` (UUID, FK)
- `almacenId` (UUID, FK)
- `envioId` (UUID, FK, opcional)
- `productos` (JSON)
- `total` (DECIMAL)
- `estado` (ENUM: pendiente, confirmado, preparando, listo, enviado, entregado, cancelado)
- `fechaEntrega` (DateTime)
- `observaciones` (TEXT)
- `deletedAt` (DateTime)

---

## 🔌 Endpoints de la API

### Autenticación

```
POST   /api/auth/register      - Registrar usuario
POST   /api/auth/login         - Iniciar sesión
POST   /api/auth/logout        - Cerrar sesión
GET    /api/auth/profile       - Obtener perfil (protegido)
```

### Clientes (Admin)

```
POST   /api/clientes           - Crear cliente
GET    /api/clientes           - Obtener todos
GET    /api/clientes/:id       - Obtener por ID
PUT    /api/clientes/:id       - Actualizar
DELETE /api/clientes/:id       - Eliminar (soft)
PATCH  /api/clientes/:id/restore - Restaurar
```

### Almacenes

```
POST   /api/almacenes          - Crear (admin)
GET    /api/almacenes          - Obtener todos (público)
GET    /api/almacenes/:id      - Obtener por ID (público)
PUT    /api/almacenes/:id      - Actualizar (admin)
DELETE /api/almacenes/:id      - Eliminar (admin, soft)
PATCH  /api/almacenes/:id/restore - Restaurar (admin)
```

### Envíos (Admin)

```
POST   /api/envios             - Crear
GET    /api/envios             - Obtener todos
GET    /api/envios/:id         - Obtener por ID
PUT    /api/envios/:id         - Actualizar
DELETE /api/envios/:id         - Eliminar (soft)
PATCH  /api/envios/:id/restore - Restaurar
```

---

## 🚀 Próximos Pasos

### 1. **Integración con Frontend**

Actualizar `AuthContext.jsx` para conectar con API:

```javascript
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const data = await response.json();
```

### 2. **Crear Cliente HTTP**

Usar `fetch` o `axios` en el frontend:

```bash
npm install axios
```

### 3. **Endpoints para Productos y Pedidos**

Crear controladores y rutas para estas entidades.

### 4. **Testing y Despliegue**

- Testing con Jest o Vitest
- Despliegue en Railway, Render, Heroku, AWS, etc.

---

## 📝 Notas Importantes

- **PostgreSQL es requerido** - No usa MongoDB
- **Sequelize maneja las migraciones** automáticamente en desarrollo
- **Soft-delete** preserva la integridad de datos relacionados
- **Base64 para imágenes** - Se almacenan directamente en la BD
- **JWT sin sesiones** - Stateless auth

---

**Estado**: ✅ Backend 100% funcional con PostgreSQL + Sequelize
**Fecha**: 21 de enero de 2026

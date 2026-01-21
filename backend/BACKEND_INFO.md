# 🎯 Backend - Estructura Completada

## ✅ Backend Creado Exitosamente

Se ha implementado un **backend profesional** con Node.js, Express y MongoDB completamente separado del frontend.

## 📁 Estructura de Carpetas

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js        # Conexión a MongoDB
│   │   └── jwt.js             # Configuración de JWT
│   ├── controllers/
│   │   ├── authController.js      # Login, register, perfil
│   │   ├── clienteController.js   # CRUD Clientes
│   │   ├── almacenController.js   # CRUD Almacenes
│   │   └── envioController.js     # CRUD Envíos
│   ├── models/
│   │   ├── Usuario.js         # Schema Usuario
│   │   ├── Cliente.js         # Schema Cliente
│   │   ├── Almacen.js         # Schema Almacén
│   │   ├── Envio.js           # Schema Envío
│   │   ├── Producto.js        # Schema Producto
│   │   └── Pedido.js          # Schema Pedido
│   ├── middleware/
│   │   └── auth.js            # Middleware de autenticación
│   └── routes/
│       ├── authRoutes.js      # Rutas de autenticación
│       ├── clienteRoutes.js   # Rutas de clientes
│       ├── almacenRoutes.js   # Rutas de almacenes
│       └── envioRoutes.js     # Rutas de envíos
├── server.js                  # Punto de entrada
├── package.json               # Dependencias
├── .env.example               # Variables de entorno
├── .gitignore                 # Git ignore
└── README.md                  # Documentación
```

## 🚀 Características Implementadas

### 1. **Autenticación y Seguridad**

- ✅ JWT (JSON Web Tokens) para autenticación
- ✅ Hash de contraseñas con bcryptjs
- ✅ Middleware de autenticación
- ✅ Control de roles (admin, cliente, deposito, envios)
- ✅ Helmet para seguridad HTTP
- ✅ CORS configurado

### 2. **Base de Datos MongoDB**

- ✅ Modelos con Mongoose
- ✅ Relaciones entre colecciones
- ✅ Soft delete (deletedAt field)
- ✅ Timestamps automáticos
- ✅ Validación de esquemas

### 3. **API REST Endpoints**

- ✅ **Autenticación**: /api/auth (register, login, logout, profile)
- ✅ **Clientes**: /api/clientes (CRUD + restore)
- ✅ **Almacenes**: /api/almacenes (CRUD + restore, con fotos en base64)
- ✅ **Envíos**: /api/envios (CRUD + restore)

### 4. **Controladores**

- ✅ authController: Login, registro, perfil
- ✅ clienteController: CRUD con soft delete y restauración
- ✅ almacenController: CRUD con soporte de fotos
- ✅ envioController: CRUD con soft delete

## 🔧 Configuración

### Instalar Dependencias

```bash
cd backend
npm install
```

### Variables de Entorno (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/almacenes-depositos
JWT_SECRET=tu-clave-secreta-super-segura-2026
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Iniciar Desarrollo

```bash
npm run dev      # Con nodemon (reload automático)
npm start        # Producción
```

## 📊 Esquemas de Datos

### Usuario

- email (único)
- password (hash)
- nombre
- role (cliente/deposito/envios/admin)
- activo
- deletedAt (soft delete)

### Cliente

- nombre, email, teléfono, empresa
- estado (activo/inactivo/suspendido)
- usuario (referencia)
- deletedAt

### Almacén

- nombre, ubicación, capacidad
- responsable, teléfono, email
- **foto** (base64 encoded)
- estado (activo/inactivo/mantenimiento)
- usuario (referencia)
- deletedAt

### Envío

- nombre, empresa, teléfono, email
- ciudad, licencia, tipoVehiculo
- estado (activo/inactivo/suspendido)
- usuario (referencia)
- deletedAt

### Producto

- nombre, descripción, precio, cantidad
- almacén (referencia)
- estado (disponible/agotado/descontinuado)
- deletedAt

### Pedido

- número (auto-generado)
- cliente, almacén, envío (referencias)
- productos (array con detalles)
- total, estado
- fechaEntrega, observaciones
- deletedAt

## 🔐 Rutas Protegidas

**Admin Only:**

- POST /api/clientes
- PUT /api/clientes/:id
- DELETE /api/clientes/:id
- PATCH /api/clientes/:id/restore
- POST /api/almacenes
- PUT /api/almacenes/:id
- DELETE /api/almacenes/:id
- PATCH /api/almacenes/:id/restore
- POST /api/envios
- PUT /api/envios/:id
- DELETE /api/envios/:id
- PATCH /api/envios/:id/restore

**Públicas:**

- GET /api/almacenes (ver almacenes)
- GET /api/almacenes/:id (detalles almacén)
- POST /api/auth/register
- POST /api/auth/login

## 📦 Dependencias Principales

- **express** (4.18.2) - Framework web
- **mongoose** (8.0.3) - ODM MongoDB
- **jsonwebtoken** (9.1.2) - JWT
- **bcryptjs** (2.4.3) - Hash de contraseñas
- **cors** (2.8.5) - CORS
- **helmet** (7.1.0) - Seguridad
- **dotenv** (16.3.1) - Variables de entorno
- **nodemon** (3.0.2) - Dev reload

## 🌐 Próximos Pasos

1. Conectar el frontend con este backend
2. Reemplazar contexto local por llamadas a API
3. Implementar más endpoints (Productos, Pedidos)
4. Agregar validaciones con express-validator
5. Implementar tests
6. Desplegar en producción (AWS, Heroku, etc.)

## 📝 Notas

- El backend está completamente separado en su propia carpeta
- Usa MongoDB como base de datos (ajustable a PostgreSQL, MySQL, etc.)
- JWT para autenticación sin sesiones
- Soft delete (no elimina datos, solo marca como eliminados)
- Soporte para fotos en base64
- CORS configurado para comunicarse con el frontend

---

**Estado**: ✅ Backend completamente funcional y listo para integración

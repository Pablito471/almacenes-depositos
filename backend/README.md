# Backend - Sistema de Gestión de Almacenes y Envíos

API REST desarrollada con Node.js, Express, PostgreSQL y Sequelize para la gestión integral de almacenes, depósitos y envíos.

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js v16 o superior
- PostgreSQL 12 o superior
- npm o yarn

### Instalación

1. **Crear base de datos PostgreSQL**

```bash
createdb almacenes_depositos
# O desde pgAdmin crear manualmente
```

2. **Instalar dependencias**

```bash
cd backend
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales PostgreSQL:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=almacenes_depositos
DB_USER=postgres
DB_PASSWORD=tu_contraseña

JWT_SECRET=tu-clave-secreta-super-segura-2026
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

4. **Iniciar servidor en desarrollo**

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`
Las tablas se crearán automáticamente en PostgreSQL.

## 📊 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/           # Configuración (Sequelize, JWT)
│   ├── controllers/      # Lógica de negocio (CRUD)
│   ├── middleware/       # Middleware de autenticación
│   ├── models/           # Modelos Sequelize
│   └── routes/           # Rutas de la API
├── server.js             # Punto de entrada
├── package.json          # Dependencias
├── .env.example          # Variables de entorno
└── POSTGRESQL_SEQUELIZE.md # Documentación detallada
```

- `POST /api/almacenes` - Crear almacén (admin)
- `GET /api/almacenes/:id` - Obtener almacén
- `PUT /api/almacenes/:id` - Actualizar almacén (admin)
- `DELETE /api/almacenes/:id` - Eliminar almacén (admin, soft delete)
- `PATCH /api/almacenes/:id/restore` - Restaurar almacén (admin)

### Envíos (Admin)

- `GET /api/envios` - Listar envíos
- `POST /api/envios` - Crear envío
- `GET /api/envios/:id` - Obtener envío
- `PUT /api/envios/:id` - Actualizar envío
- `DELETE /api/envios/:id` - Eliminar envío (soft delete)
- `PATCH /api/envios/:id/restore` - Restaurar envío

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Incluir el token en el header:

```bash
Authorization: Bearer <tu-token-aqui>
```

## 🗄️ Modelos de Datos

### Usuario

```javascript
{
  email: string (unique),
  password: string (hashed),
  nombre: string,
  role: "cliente" | "deposito" | "envios" | "admin",
  activo: boolean,
  deletedAt: date (null)
}
```

### Cliente

```javascript
{
  nombre: string,
  email: string,
  telefono: string,
  empresa: string,
  estado: "activo" | "inactivo" | "suspendido",
  usuario: ObjectId (ref Usuario),
  deletedAt: date (null)
}
```

### Almacén

```javascript
{
  nombre: string,
  ubicacion: string,
  capacidad: string,
  responsable: string,
  telefono: string,
  email: string,
  foto: string (base64),
  estado: "activo" | "inactivo" | "mantenimiento",
  usuario: ObjectId (ref Usuario),
  deletedAt: date (null)
}
```

### Envío

```javascript
{
  nombre: string,
  empresa: string,
  telefono: string,
  email: string,
  ciudad: string,
  licencia: string,
  tipoVehiculo: string,
  estado: "activo" | "inactivo" | "suspendido",
  usuario: ObjectId (ref Usuario),
  deletedAt: date (null)
}
```

## 🔒 Roles y Permisos

- **Admin**: Acceso total a todas las funcionalidades
- **Cliente**: Puede ver almacenes y crear pedidos
- **Depósito**: Gestiona inventario y pedidos
- **Envíos**: Gestiona entregas y envíos

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Bcryptjs** - Hash de contraseñas
- **Helmet** - Seguridad HTTP
- **CORS** - Control de acceso origen
- **Nodemon** - Reload en desarrollo

## 📝 Ejemplo de Uso

### Registrarse

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123",
    "nombre": "Juan Pérez",
    "role": "cliente"
  }'
```

### Iniciar Sesión

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

### Crear Cliente (Admin)

```bash
curl -X POST http://localhost:5000/api/clientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "nombre": "Empresa XYZ",
    "email": "empresa@xyz.com",
    "telefono": "123456789",
    "empresa": "XYZ Corp"
  }'
```

## 🚨 Variables de Entorno

| Variable     | Descripción             | Valor por Defecto                             |
| ------------ | ----------------------- | --------------------------------------------- |
| PORT         | Puerto del servidor     | 5000                                          |
| MONGODB_URI  | URI de MongoDB          | mongodb://localhost:27017/almacenes-depositos |
| JWT_SECRET   | Clave secreta JWT       | tu-clave-secreta-super-segura-2026            |
| FRONTEND_URL | URL del frontend (CORS) | http://localhost:3000                         |
| NODE_ENV     | Ambiente                | development                                   |

## 📦 Scripts

```bash
# Desarrollo (con reload)
npm run dev

# Producción
npm start

# Tests (próximamente)
npm test
```

## 🐛 Debugging

Ver logs detallados:

```bash
DEBUG=* npm run dev
```

## 📄 Licencia

ISC

## 👥 Autor

Sistema de Gestión de Almacenes y Envíos © 2026

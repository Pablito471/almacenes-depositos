# 📦 Sistema de Almacenes & Depósitos - Full Stack

> **Sistema integral de gestión de almacenes, depósitos y envios** - Arquitectura Full Stack profesional con JavaScript puro, separada en carpetas independientes y lista para producción en Vercel.

## 🚀 Características

✅ **Backend modularizado** con Express.js  
✅ **Frontend optimizado** con React/Next.js  
✅ **Base de datos PostgreSQL** con Sequelize  
✅ **Autenticación JWT** segura  
✅ **Tres tipos de usuarios**: Cliente, Depósito, Empresa de Envios  
✅ **API REST** completa y documentada  
✅ **Responsive design** con Tailwind CSS  
✅ **Listo para Vercel** - Frontend preparado para deployment  
✅ **JavaScript puro** - Sin TypeScript  
✅ **Arquitectura profesional** - Separación de concerns completa

---

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/                    # 🔙 API Express.js
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── database/
│   │   │   ├── connection.js  # Conexión Sequelize
│   │   │   └── init.js        # Inicialización y relaciones
│   │   ├── models/            # 6 modelos Sequelize
│   │   ├── services/          # Lógica de negocio
│   │   ├── routes/            # Rutas API
│   │   ├── middleware/        # Auth, Logger, ErrorHandler
│   │   └── utils/             # Funciones auxiliares
│   ├── .env.local             # Variables de entorno
│   └── package.json
│
├── frontend/                   # 🎨 React/Next.js
│   ├── src/
│   │   ├── pages/             # Páginas Next.js
│   │   │   ├── index.js       # Home
│   │   │   ├── login.js       # Login
│   │   │   ├── register.js    # Register
│   │   │   ├── cliente/
│   │   │   │   └── dashboard.js
│   │   │   ├── deposito/
│   │   │   │   └── dashboard.js
│   │   │   └── envios/
│   │   │       └── dashboard.js
│   │   ├── components/        # Componentes reutilizables
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # Llamadas API
│   │   └── styles/            # CSS global
│   ├── .env.local             # Variables de entorno
│   ├── next.config.js         # Config Next.js
│   ├── tailwind.config.js     # Config Tailwind
│   └── package.json
│
├── package.json               # Monorepo con workspaces
└── README.md
```

---

## ⚡ Inicio Rápido

### 1. Instalación

```bash
# Clonar repositorio
cd proyecto

# Instalar dependencias (instala backend y frontend)
npm install
```

### 2. Configurar Base de Datos

```bash
# Crear base de datos PostgreSQL
createdb almacenes_depositos

# Configurar .env.local en backend/ con:
# DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/almacenes_depositos
```

### 3. Desarrollo Local

```bash
# Iniciar backend (puerto 5000) + frontend (puerto 3000)
npm run dev

# O por separado:
npm run dev:backend   # Backend solo
npm run dev:frontend  # Frontend solo
```

### 4. Acceder

- 🎨 Frontend: http://localhost:3000
- 🔙 API: http://localhost:5000

---

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** con expiración de 24 horas.

### Flujo:

1. Usuario se registra con email, password, nombre y tipo
2. Backend hashea contraseña con bcryptjs
3. En login, se genera JWT con: `{id, email, tipo}`
4. Token se almacena en `localStorage`
5. Se envía en header `Authorization: Bearer <token>` para requests autenticadas
6. Middleware valida y autoriza según tipo de usuario

---

## 👥 Tipos de Usuario

### 1. 👤 Cliente

- Registrarse como cliente
- Explorar depósitos disponibles
- Ver productos de cada depósito
- Agregar a carrito
- Crear pedidos con dirección de entrega
- Rastrear pedidos

### 2. 🏢 Depósito

- Registrarse con información de depósito
- Agregar/editar/eliminar productos
- Establecer precios y stock
- Ver pedidos asignados
- Actualizar estado: pendiente → confirmado → preparado → listo_envio

### 3. 📦 Empresa de Envios

- Registrarse como empresa de envios
- Crear envios desde pedidos disponibles
- Generar número de seguimiento automático
- Actualizar estado: pendiente → recogido → en_transito → entregado
- Registrar fechas de salida y entrega

---

## 📊 Modelos de Base de Datos

### Usuario

```
id (UUID) - Primary Key
email (String, unique)
password (String, hashed)
nombre (String)
tipo (ENUM: cliente, deposito, envios)
activo (Boolean)
timestamps
```

### Deposito

```
id (UUID)
usuarioId (FK → Usuario)
nombre, ubicacion, ciudad, pais, telefono
timestamps
```

### Producto

```
id (UUID)
depositoId (FK → Deposito)
nombre, descripcion, precio, stock
timestamps
```

### Pedido

```
id (UUID)
clienteId (FK → Usuario)
depositoId (FK → Deposito)
numero (unique)
estado (ENUM: 7 estados)
total, direccion_entrega, ciudad_entrega, etc.
timestamps
```

### ItemPedido

```
id (UUID)
pedidoId (FK → Pedido, cascade delete)
productoId (FK → Producto)
cantidad, precio_unitario
```

### Envio

```
id (UUID)
pedidoId (FK → Pedido, cascade delete)
empresaEnvioId (FK → Usuario)
numero_seguimiento (unique, auto-generado)
estado (ENUM: 5 estados)
fecha_salida, fecha_entrega
```

---

## 🔌 API Endpoints

### Autenticación

```
POST   /api/auth/register    # Registrar usuario
POST   /api/auth/login       # Iniciar sesión
```

### Depósitos

```
GET    /api/depositos                # Listar todos
POST   /api/depositos                # Crear (deposito)
GET    /api/depositos/:id            # Obtener detalle
PUT    /api/depositos/:id            # Actualizar (deposito)
DELETE /api/depositos/:id            # Eliminar (deposito)
```

### Productos

```
POST   /api/productos                       # Crear (deposito)
GET    /api/productos/deposito/:depositoId  # Listar por depósito
GET    /api/productos/:id                   # Obtener
PUT    /api/productos/:id                   # Actualizar (deposito)
DELETE /api/productos/:id                   # Eliminar (deposito)
```

### Pedidos

```
POST   /api/pedidos              # Crear (cliente)
GET    /api/pedidos              # Listar (según rol)
GET    /api/pedidos/:id          # Obtener detalle
PUT    /api/pedidos/:id          # Actualizar estado (deposito)
```

### Envios

```
POST   /api/envios               # Crear (envios)
GET    /api/envios               # Listar (envios)
GET    /api/envios/:id           # Obtener detalle
PUT    /api/envios/:id           # Actualizar estado (envios)
```

---

## 🌐 Deployment en Vercel

### Frontend (Vercel + Next.js)

1. **Preparar repositorio**

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
```

2. **Conectar con Vercel**
   - Ir a https://vercel.com/dashboard
   - Click "New Project"
   - Conectar repositorio Git
   - Seleccionar carpeta `frontend`
   - Configurar variables de entorno:
     ```
     NEXT_PUBLIC_API_URL=https://tu-api.com/api
     ```

3. **Deploy automático**
   - Cada push a `main` despliega automáticamente
   - Vercel maneja build con `npm run build`

### Backend (Opciones)

#### Opción 1: Render.com (recomendado para Node)

```bash
# Agregar build script en backend/package.json
"build": "echo 'Backend ready'"

# Conectar repositorio
# Settings → Build & Deploy
# Build: npm install
# Start: npm run start
```

#### Opción 2: Railway

- Conectar repositorio
- Auto-detects Node.js
- Deploy automático

#### Opción 3: Heroku

```bash
# (Heroku Dynos ahora son pagos, no recomendado)
```

---

## 🛠️ Scripts Disponibles

### Raíz (Monorepo)

```bash
npm run dev              # Inicia backend + frontend
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend
npm run build            # Construye todo
npm run start:backend    # Inicia backend en producción
```

### Backend

```bash
npm run dev              # Desarrollo con watch
npm run start            # Producción
npm run build            # Preparar para producción
```

### Frontend

```bash
npm run dev              # Desarrollo
npm run build            # Construcción Next.js
npm run start            # Inicia servidor producci.
```

---

## 📚 Hooks Personalizados

### `useAuth()`

```javascript
const { user, loading, error, login, register, logout } = useAuth();
```

### `useFetch(fetchFn)`

```javascript
const { data, loading, error, execute } = useFetch(fetchFn);
```

### `useForm(initialValues, onSubmit)`

```javascript
const { values, handleChange, handleSubmit, ... } = useForm({...}, handler);
```

### `useLocalStorage(key, initial)`

```javascript
const [value, setValue] = useLocalStorage("token", null);
```

---

## 🎨 Componentes Reutilizables

- **Button** - Con variantes (primary, secondary, danger, success)
- **Input** - Con validación y error display
- **Card** - Contenedor con shadow
- **Alert** - Mensajes (info, success, warning, error)
- **Navbar** - Navegación con logout
- **Loading** - Spinner con mensaje

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcryptjs (10 salt rounds)
- ✅ JWT con expiración de 24h
- ✅ CORS habilitado solo para frontend
- ✅ Validación de permisos en cada endpoint
- ✅ Middleware de autenticación en rutas protegidas
- ✅ Error handling sin exponer detalles sensibles

---

## 📝 Variables de Entorno

### Backend (.env.local)

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://...
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=almacenes_depositos
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### "Error: connect ECONNREFUSED localhost:5432"

→ PostgreSQL no está corriendo. Inicia: `pg_ctl start`

### "NEXT_PUBLIC_API_URL is undefined"

→ Reinicia `npm run dev:frontend` después de cambiar .env.local

### "Token inválido"

→ Limpia localStorage: `localStorage.clear()`

---

## 📞 Contacto & Soporte

Para soporte técnico o reportar bugs, contacta al equipo de desarrollo.

---

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales.

---

**Desarrollado con ❤️ - JavaScript Full Stack Professional**

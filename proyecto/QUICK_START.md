# 🚀 Guía de Inicio Rápido

## ✅ Instalación Inmediata

```bash
# 1. En la raíz del proyecto
npm install

# 2. Crear la base de datos PostgreSQL
createdb almacenes_depositos

# 3. Configurar backend/.env.local (ya está configurado)

# 4. Iniciar el desarrollo
npm run dev
```

---

## 🌐 Acceso Inmediato

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## 🧪 Prueba Rápida

### 1. Registro Cliente

```
URL: http://localhost:3000/register?tipo=cliente
Datos:
- Email: cliente@test.com
- Password: Test123456
- Nombre: Juan Cliente
- Tipo: cliente
```

### 2. Registro Depósito

```
URL: http://localhost:3000/register?tipo=deposito
Datos:
- Email: deposito@test.com
- Password: Test123456
- Nombre: Admin Deposito
- Tipo: deposito
- Datos Depósito:
  - Nombre: Almacén Central
  - Ubicación: Carrera 5 #10-20
  - Ciudad: Bogotá
  - Teléfono: +57 1 2345678
```

### 3. Registro Empresa Envios

```
URL: http://localhost:3000/register?tipo=envios
Datos:
- Email: envios@test.com
- Password: Test123456
- Nombre: Transportes Express
- Tipo: envios
```

---

## 📊 Flujo de Prueba Completo

### 1️⃣ **Crear Depósito con Productos**

- Registrar como depósito
- Dashboard → Productos tab
- Agregar productos:
  - Laptop: $800, Stock: 10
  - Mouse: $25, Stock: 50
  - Teclado: $100, Stock: 30

### 2️⃣ **Cliente Realiza Compra**

- Registrar como cliente
- Dashboard Cliente
- Seleccionar depósito
- Agregar productos al carrito
- Ingresar dirección: "Calle 100 #5-50"
- Ciudad: "Medellín"
- Crear Pedido

### 3️⃣ **Depósito Procesa Pedido**

- Login como depósito
- Ver pedido en tab "Pedidos"
- Cambiar estado:
  - pendiente → confirmado → preparado → listo_envio

### 4️⃣ **Empresa de Envios Entrega**

- Login como empresa de envios
- Dashboard Envios
- Seleccionar pedido (estará disponible cuando esté listo_envio)
- Crear Envío (auto-genera número de seguimiento)
- Cambiar estado:
  - pendiente → recogido → en_transito → entregado

---

## 🎯 Estados del Flujo

### Estados de Pedido

```
pendiente ──→ confirmado ──→ preparado ──→ listo_envio ──→ enviado ──→ entregado
```

### Estados de Envío

```
pendiente ──→ recogido ──→ en_transito ──→ entregado
   ↓
 devuelto
```

---

## 🔑 Credenciales de Prueba (Después de crear)

```
Cliente:
- Email: cliente@test.com
- Password: Test123456

Depósito:
- Email: deposito@test.com
- Password: Test123456

Envios:
- Email: envios@test.com
- Password: Test123456
```

---

## 🐛 Troubleshooting

### PostgreSQL Connection Error

```bash
# Iniciar PostgreSQL (macOS)
brew services start postgresql

# O Windows
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start
```

### Base de datos no existe

```bash
createdb almacenes_depositos
```

### Puerto 5000 en uso

```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend no conecta a API

1. Verificar que backend esté corriendo: http://localhost:5000/health
2. Revisar `.env.local` en frontend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Reiniciar frontend: `npm run dev:frontend`

---

## 📁 Estructura de Carpetas

```
proyecto/
├── backend/              # Express API
│   ├── src/
│   │   ├── index.js
│   │   ├── models/       # Sequelize models
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API endpoints
│   │   └── middleware/   # Auth, errors
│   └── .env.local
│
├── frontend/             # Next.js App
│   ├── src/
│   │   ├── pages/        # Páginas Next.js
│   │   ├── components/   # Reutilizables
│   │   ├── hooks/        # Custom hooks
│   │   └── services/     # API calls
│   └── .env.local
│
└── package.json          # Monorepo
```

---

## 🚀 Deploy a Vercel (Frontend)

### Opción 1: Desde Git

```bash
# 1. Push a GitHub
git add .
git commit -m "Initial commit"
git push

# 2. En Vercel Dashboard
# New Project → Select Repository → Import
# Framework: Next.js
# Root Directory: frontend
# Environment: NEXT_PUBLIC_API_URL=<tu-api>/api
```

### Opción 2: Deploy Manual

```bash
npm i -g vercel
vercel
# Follow prompts
```

---

## 📚 Documentación Completa

Ver `README.md` para documentación completa de:

- API endpoints
- Modelos de BD
- Autenticación
- Variables de entorno
- Deployment en producción

---

## 💡 Tips

- 🎨 Componentes en `frontend/src/components/`
- 🔧 Servicios API en `frontend/src/services/`
- 🎯 Hooks en `frontend/src/hooks/`
- ⚙️ Rutas backend en `backend/src/routes/`
- 📊 Modelos en `backend/src/models/`

---

## ✨ Próximos Pasos

1. ✅ Setup local completo
2. ✅ Probar flujo cliente → depósito → envios
3. ⬜ Agregar más productos y pedidos
4. ⬜ Deploy frontend a Vercel
5. ⬜ Deploy backend a Render/Railway
6. ⬜ Conectar dominio personalizado

---

**¡El sistema está listo para usar!** 🎉

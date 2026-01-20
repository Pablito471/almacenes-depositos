# AlmacenesHub - Sistema de Gestión de Pedidos

Sistema integral y modularizado para la gestión de pedidos, almacenes y entregas. Una aplicación web moderna construida con Next.js 16, Tailwind CSS y React.

## Características

### 👥 Para Clientes

- **Navegación por almacenes**: Selecciona entre diferentes depósitos disponibles
- **Catálogo de productos**: Explora productos con precios actualizados
- **Carrito de compras**: Agrega y administra productos antes de confirmar
- **Gestión de pedidos**: Crea, visualiza y cancela pedidos
- **Historial completo**: Seguimiento de todos los pedidos realizados

### 📦 Para Almacenes (Depósitos)

- **Gestión de inventario**: Actualiza stocks de productos
- **Control de precios**: Modifica precios en tiempo real
- **Procesamiento de pedidos**: Recibe y procesa pedidos de clientes
- **Actualización de estado**: Cambia el estado de pedidos (pendiente → confirmado → preparando → enviando)

### 🚚 Para Envíos

- **Entregas pendientes**: Visualiza todos los pedidos listos para enviar
- **Confirmación de entrega**: Marca pedidos como entregados
- **Historial de entregas**: Registro completo de entregas realizadas

## Tecnología

- **Frontend**: Next.js 16, React 19, App Router
- **Estilo**: Tailwind CSS 4
- **Alertas**: SweetAlert2
- **Iconos**: React Icons
- **Autenticación**: Context API (cliente)
- **Estado**: Context API + LocalStorage
- **Lenguaje**: JavaScript moderno (ES6+)

## Estructura del Proyecto

```
src/
├── app/                          # Rutas principales (App Router)
│   ├── cliente/                 # Páginas para clientes
│   ├── deposito/                # Páginas para almacenes
│   ├── envios/                  # Páginas para envíos
│   └── pages/auth/              # Autenticación
├── components/
│   ├── common/                  # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   └── OrderCard.jsx
│   └── layouts/                 # Layouts
│       └── MainLayout.jsx
├── context/                      # Context API
│   ├── AuthContext.jsx
│   └── PedidosContext.jsx
├── hooks/                        # Custom hooks
│   └── useProtectedRoute.js
├── services/                     # Servicios/API
│   └── authService.js
└── utils/                        # Funciones utilitarias
    ├── alerts.js
    └── formatters.js
```

## Instalación y Setup

### Requisitos

- Node.js 18+
- npm o yarn

### Pasos de instalación

```bash
# Instalar dependencias
npm install

# Crear archivo .env.local (opcional)
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm run start
```

## Uso

### Acceso a la aplicación

1. Abre [http://localhost:3000](http://localhost:3000)
2. Selecciona tu rol (Cliente, Almacén o Envíos)
3. Usa las credenciales de demostración:

#### Cliente

- Email: `cliente@example.com`
- Contraseña: `cliente123`

#### Almacén

- Email: `deposito@example.com`
- Contraseña: `deposito123`

#### Envíos

- Email: `envios@example.com`
- Contraseña: `envios123`

## Deployment en Vercel

Esta aplicación está optimizada para desplegarse en Vercel:

### Opción 1: Deploy automático

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opción 2: Conectar repositorio GitHub

1. Push tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Deploy automático en cada push a main

## Características de Seguridad

- ✅ Rutas protegidas por autenticación
- ✅ Context API para manejo de estado seguro
- ✅ LocalStorage para persistencia de datos
- ✅ Validación de formularios
- ✅ Confirmaciones de acciones críticas

## Flujo de Pedidos

```
Cliente crea pedido
    ↓
Depósito recibe notificación
    ↓
Depósito confirma (pendiente → confirmado)
    ↓
Depósito prepara (confirmado → preparando)
    ↓
Depósito envía (preparando → enviando)
    ↓
Envíos recibe pedido
    ↓
Envíos entrega (enviando → entregado)
```

## Personalización

### Agregar nuevos depósitos

Edita `src/services/authService.js`:

```javascript
const mockDepositos = [
  { id: "1", nombre: "Tu Almacén", ubicacion: "Ciudad", telefono: "+34..." },
  // Agrega aquí...
];
```

### Agregar productos

Edita `src/services/authService.js`:

```javascript
const mockProductos = {
  1: [
    {
      id: "p1",
      nombre: "Producto",
      descripcion: "Desc",
      precio: 99.99,
      stock: 10,
    },
    // Agrega aquí...
  ],
};
```

## Variables de Entorno

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Nota: Actualmente la aplicación usa datos mock (localStorage). Para producción, conecta tu backend API.

## Performance

- ✅ Optimizado para Vercel
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Static generation donde es posible
- ✅ Tailwind CSS con purge automático

## Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio.

---

**Hecho con ❤️ para gestionar almacenes de forma moderna y eficiente.**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

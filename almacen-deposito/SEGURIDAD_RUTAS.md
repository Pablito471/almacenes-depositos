# 🔐 Sistema de Seguridad de Rutas

## ✨ Características de Seguridad

### Protección de Rutas

- ✓ Rutas protegidas por autenticación
- ✓ Control de acceso basado en roles (RBAC)
- ✓ Redirecciones automáticas
- ✓ Validación de sesión
- ✓ Logout seguro

### Autenticación

- ✓ Verificación de usuario autenticado
- ✓ Validación de rol de usuario
- ✓ Token persistente en localStorage
- ✓ Limpieza segura al cerrar sesión

### Autorización

- ✓ Control de acceso por rol
- ✓ Rutas específicas por role
- ✓ Permisos granulares
- ✓ Mensajes de acceso denegado

---

## 📁 Archivos Creados/Modificados

### Nuevos Archivos

- `src/middleware.js` - Middleware de seguridad
- `src/hooks/useProtectedRoute.js` - Hook mejorado (MODIFICADO)
- `src/hooks/withProtectedRoute.js` - HOC para proteger componentes
- `src/config/routeConfig.js` - Configuración de rutas
- `src/services/securityService.js` - Servicio de seguridad
- `src/components/common/AccessDenied.jsx` - Página de acceso denegado
- `src/app/pages/auth/login/page.js` - Login mejorado (MODIFICADO)

---

## 🔄 Flujo de Seguridad

### 1. Usuario Sin Autenticación

```
User accede a /cliente/productos
    ↓
middleware.js detecta la ruta protegida
    ↓
useProtectedRoute valida en cliente
    ↓
No hay usuario en localStorage
    ↓
Redirige a /pages/auth/login
```

### 2. Usuario Autenticado (Rol Incorrecto)

```
Usuario cliente accede a /deposito/productos
    ↓
middleware.js detecta la ruta protegida
    ↓
useProtectedRoute valida el rol
    ↓
role = "cliente" pero requiere "deposito"
    ↓
Muestra AccessDenied (wrong-role)
    ↓
Opción: Volver al Inicio (/cliente/productos)
```

### 3. Usuario Autenticado (Rol Correcto)

```
Usuario cliente accede a /cliente/productos
    ↓
middleware.js detecta la ruta protegida
    ↓
useProtectedRoute valida autenticación
    ↓
user existe y role coincide
    ↓
Permite acceso
    ↓
Muestra página de productos
```

---

## 🛡️ Estructura de Seguridad

### Hook useProtectedRoute

```javascript
const { loading, user, role, isAuthorized } = useProtectedRoute("cliente");
// - loading: boolean (cargando datos)
// - user: object (datos del usuario)
// - role: string (rol del usuario)
// - isAuthorized: boolean (tiene acceso autorizado)
```

**Ubicación:** `src/hooks/useProtectedRoute.js`

**Uso:**

```javascript
export default function ClienteProductosPage() {
  const { loading } = useProtectedRoute("cliente");

  if (loading) return <div>Cargando...</div>;
  return <MainLayout>{/* contenido */}</MainLayout>;
}
```

### HOC withProtectedRoute

```javascript
import { withProtectedRoute } from "@/hooks/withProtectedRoute";

function MyPage(props) {
  return <div>Contenido protegido</div>;
}

export default withProtectedRoute(MyPage, "cliente");
```

### Middleware de Seguridad

**Ubicación:** `src/middleware.js`

Valida todas las rutas protegidas:

- `/cliente/*` → Solo rol "cliente"
- `/deposito/*` → Solo rol "deposito"
- `/envios/*` → Solo rol "envios"

### Servicio de Seguridad

**Ubicación:** `src/services/securityService.js`

Funciones disponibles:

```javascript
// Validación
isAuthenticated(); // boolean
validateSession(); // { valid, message }

// Obtener datos
getCurrentUser(); // object|null
getCurrentRole(); // string|null
getUserProfile(); // object|null
getSessionInfo(); // object con toda la info

// Validar permisos
hasRole("cliente"); // boolean
hasAnyRole(["cliente", "deposito"]); // boolean

// Limpiar
clearAuth(); // void
```

### Configuración de Rutas

**Ubicación:** `src/config/routeConfig.js`

```javascript
ROUTE_CONFIG = {
  public: ["/", "/pages/auth/login"],
  protected: {
    cliente: ["/cliente", "/cliente/productos", ...],
    deposito: ["/deposito", "/deposito/productos", ...],
    envios: ["/envios", "/envios/entregas", ...]
  }
}
```

---

## 🎯 Rutas Protegidas

### Rutas Públicas (Sin Autenticación)

| Ruta                | Descripción      |
| ------------------- | ---------------- |
| `/`                 | Página de inicio |
| `/pages/auth/login` | Login y registro |

### Rutas de Cliente (requiere `role: "cliente"`)

| Ruta                 | Descripción                |
| -------------------- | -------------------------- |
| `/cliente/productos` | Buscar y comprar productos |
| `/cliente/pedidos`   | Ver mis pedidos            |
| `/cliente/perfil`    | Editar perfil              |

### Rutas de Depósito (requiere `role: "deposito"`)

| Ruta                  | Descripción               |
| --------------------- | ------------------------- |
| `/deposito/productos` | Gestionar productos       |
| `/deposito/pedidos`   | Gestionar pedidos         |
| `/deposito/perfil`    | Editar perfil empresarial |

### Rutas de Envíos (requiere `role: "envios"`)

| Ruta                | Descripción   |
| ------------------- | ------------- |
| `/envios/entregas`  | Ver entregas  |
| `/envios/historial` | Ver historial |
| `/envios/perfil`    | Editar perfil |

---

## 🔐 Almacenamiento Seguro

### localStorage Keys

```javascript
// Autenticación
user = JSON.stringify({
  id: "unique-id",
  email: "user@example.com",
  nombre: "Nombre Completo",
  role: "cliente|deposito|envios",
});

role = "cliente|deposito|envios";

profile = JSON.stringify({
  nombre: "...",
  email: "...",
  telefono: "...",
  dni: "...",
  direccion: "...",
  foto: "base64...",
});
```

### Validación de Sesión

```javascript
import { validateSession } from "@/services/securityService";

const { valid, message } = validateSession();
if (!valid) {
  console.error("Sesión inválida:", message);
}
```

---

## 🚪 Página AccessDenied

Mostrada cuando:

- ❌ Usuario no autenticado
- ❌ Usuario con rol incorrecto
- ❌ Acceso denegado

**Componente:** `src/components/common/AccessDenied.jsx`

**Razones:**

```javascript
<AccessDenied reason="not-authenticated" />  // Ir a Login
<AccessDenied reason="wrong-role" />         // Volver al Inicio
<AccessDenied reason="access-denied" />      // Volver al Inicio
```

---

## 🧪 Cómo Probar

### Prueba 1: Acceso sin Autenticación

1. Abre `/cliente/productos` sin estar autenticado
2. Deberías ser redirigido a `/pages/auth/login`

### Prueba 2: Acceso con Rol Incorrecto

1. Inicia sesión como cliente
2. Intenta acceder a `/deposito/productos`
3. Deberías ver "Rol Insuficiente"

### Prueba 3: Acceso Correcto

1. Inicia sesión como cliente
2. Accede a `/cliente/productos`
3. Deberías ver el contenido

### Prueba 4: Logout y Redirección

1. Inicia sesión
2. Cierra sesión (logout)
3. Intenta acceder a ruta protegida
4. Deberías ser redirigido a login

### Prueba 5: Validación de Sesión

Abre la consola y ejecuta:

```javascript
import { validateSession, getSessionInfo } from "@/services/securityService";

console.log(getSessionInfo());
console.log(validateSession());
```

---

## 🔒 Headers de Seguridad

### HTTP Headers (Próximos)

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### HTTPS Obligatorio (Producción)

- Redirect HTTP → HTTPS
- HSTS Header
- Secure Cookies

---

## 🛡️ Mejores Prácticas Implementadas

✓ **Validación en Cliente y Servidor**

- Hook useProtectedRoute (cliente)
- Middleware.js (servidor)

✓ **Roles Basados en RBAC**

- 3 roles definidos: cliente, deposito, envios
- Cada rol tiene rutas específicas

✓ **Logout Seguro**

- Limpia localStorage
- Redirige a login
- Invalida sesión

✓ **Mensajes Claros**

- AccessDenied con razones específicas
- Opciones de acción claras

✓ **Validación de Datos**

- Verifica integridad de sesión
- Valida estructura de usuario

---

## 🚀 Próximas Mejoras

- [ ] Refresh tokens automáticos
- [ ] Rate limiting de login
- [ ] Detección de sesiones duplicadas
- [ ] Auditoría de accesos
- [ ] 2FA (Autenticación de dos factores)
- [ ] OAuth con Google/GitHub
- [ ] Encriptación de localStorage
- [ ] HTTPS obligatorio
- [ ] CSP (Content Security Policy)
- [ ] CSRF tokens
- [ ] Protección contra XSS

---

## ✅ Checklist de Seguridad

- [x] Rutas protegidas por autenticación
- [x] Control de acceso por rol
- [x] Hook useProtectedRoute mejorado
- [x] Middleware de validación
- [x] HOC withProtectedRoute
- [x] Servicio de seguridad
- [x] Configuración centralizada
- [x] Página AccessDenied
- [x] Logout seguro
- [x] Validación de sesión
- [x] Sin errores de compilación
- [x] Todas las rutas protegidas

---

## 📊 Matriz de Acceso

| Usuario        | Ruta                  | Acceso              |
| -------------- | --------------------- | ------------------- |
| No autenticado | `/`                   | ✓                   |
| No autenticado | `/cliente/productos`  | ✗ → Login           |
| Cliente        | `/cliente/productos`  | ✓                   |
| Cliente        | `/deposito/productos` | ✗ → Acceso Denegado |
| Almacén        | `/deposito/productos` | ✓                   |
| Almacén        | `/cliente/productos`  | ✗ → Acceso Denegado |
| Envíos         | `/envios/entregas`    | ✓                   |
| Envíos         | `/cliente/productos`  | ✗ → Acceso Denegado |

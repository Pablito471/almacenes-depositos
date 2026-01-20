# 👨‍💻 Guía para Desarrolladores

## Comenzar a Desarrollar

### Setup Inicial

```bash
# Clonar repositorio
git clone <tu-repo>
cd almacen-deposito

# Instalar dependencias
npm install

# Crear archivo .env.local
cp .env.example .env.local

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Estructura de Carpetas Explicada

### `/src/app`

Rutas principales usando App Router de Next.js 16. Cada carpeta corresponde a una ruta.

```
/cliente/productos     → /cliente/productos
/cliente/pedidos       → /cliente/pedidos
/pages/auth/login      → /pages/auth/login
```

### `/src/components`

Componentes reutilizables organizados en:

- **common**: Botones, inputs, cards, headers
- **layouts**: Layouts principales (MainLayout)

### `/src/context`

State management con Context API:

- **AuthContext**: Manejo de autenticación y usuario
- **PedidosContext**: Gestión de pedidos y carrito

### `/src/hooks`

Custom hooks:

- **useProtectedRoute**: Protege rutas según el rol del usuario
- **useAuth**: Acceso al contexto de autenticación
- **usePedidos**: Acceso al contexto de pedidos

### `/src/services`

Servicios de integración:

- **authService.js**: Lógica de login y datos mock

### `/src/utils`

Utilidades y helpers:

- **alerts.js**: Configuración de SweetAlert2
- **formatters.js**: Formateo de moneda, fechas, etc.

## Convenciones de Código

### Componentes

- Todos los componentes son funcionales
- Usar `'use client'` en componentes que necesitan interactividad
- Nombrar archivos en PascalCase: `Button.jsx`, `ProductCard.jsx`

### Archivos de páginas

- Nombrar `page.js` dentro de la carpeta de ruta
- Usar `'use client'` si es interactivo
- Importar layouts y componentes

### Imports

```javascript
// Utilizar alias @/ para imports desde src
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { formatters } from "@/utils/formatters";
```

### Estilos

- Usar Tailwind CSS únicamente
- Clases en orden: display, tamaño, padding, colores, sombras, etc.
- Evitar CSS modules (Tailwind maneja todo)

## Agregar Nueva Funcionalidad

### Nuevo Componente

1. Crea el archivo en `/src/components/common/MiComponente.jsx`
2. Exporta como default
3. Importa en dónde lo necesites

```javascript
"use client";

export default function MiComponente({ prop }) {
  return <div className="...">{prop}</div>;
}
```

### Nueva Página

1. Crea carpeta en `/src/app/nueva-ruta`
2. Crea archivo `page.js`
3. Importa layout si es necesario

```javascript
"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function NuevaPage() {
  return (
    <MainLayout>
      <h1>Contenido aquí</h1>
    </MainLayout>
  );
}
```

### Nuevo Context

1. Crea en `/src/context/MiContext.jsx`
2. Usa createContext y Provider
3. Envuelve el app en layout.js

```javascript
"use client";

import { createContext, useContext } from "react";

const MiContext = createContext();

export function MiProvider({ children }) {
  const value = {
    /* ... */
  };
  return <MiContext.Provider value={value}>{children}</MiContext.Provider>;
}

export function useMi() {
  const context = useContext(MiContext);
  if (!context) throw new Error("Usa dentro del provider");
  return context;
}
```

## Manejo de Estado

### Context API

Para estado global simple, usa Context API:

```javascript
import { usePedidos } from "@/context/PedidosContext";

function MiComponente() {
  const { pedidos, crearPedido } = usePedidos();
  // ...
}
```

### LocalStorage

Para persistencia local:

```javascript
// Guardar
localStorage.setItem("clave", JSON.stringify(valor));

// Recuperar
const valor = JSON.parse(localStorage.getItem("clave"));

// Limpiar
localStorage.removeItem("clave");
```

## Manejo de Formularios

### Ejemplo completo

```javascript
import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { alerts } from "@/utils/alerts";

export default function MiFormulario() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alerts.warning("Error", "Completa el campo");
      return;
    }

    setLoading(true);
    try {
      // Tu lógica aquí
      alerts.success("Éxito", "Operación completada");
    } catch (error) {
      alerts.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Enviar"}
      </Button>
    </form>
  );
}
```

## Testing

Aunque no hay tests automatizados configurados, puedes agregar Jest y React Testing Library:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Crea tests en `__tests__` o junto a los componentes: `Button.test.jsx`

## Debug

### Console Logs

```javascript
console.log("mi variable", miVariable);
```

### Browser DevTools

- Abre F12 en el navegador
- Console: mensajes y errores
- Sources: debugging paso a paso
- Network: requests HTTP

### VS Code Debugger

Crea `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "attach",
      "port": 9229
    }
  ]
}
```

Ejecuta con:

```bash
node --inspect-brk ./node_modules/.bin/next dev
```

## Performance

### Optimizaciones implementadas

- ✅ Code splitting automático
- ✅ Lazy loading
- ✅ Static generation
- ✅ Tailwind CSS optimizado

### Medir performance

```bash
npm run build
npm run start

# Abre http://localhost:3000 en Lighthouse (F12)
```

## Seguridad

### Rutas Protegidas

```javascript
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function PaginaAdmin() {
  const { loading } = useProtectedRoute("admin");
  if (loading) return <div>Cargando...</div>;
  // ...
}
```

### Variables Sensibles

- Nunca commitees `.env.local`
- Usa `NEXT_PUBLIC_` solo para variables públicas
- Usa otras variables para API keys y secrets

## Commit Messages

Seguir formato:

```
feat: agregar nueva funcionalidad
fix: corregir bug
docs: actualizar documentación
style: cambios de formato
refactor: refactorizar código
test: agregar tests
chore: tareas de manttenimiento
```

Ejemplo:

```bash
git commit -m "feat: agregar carrito de compras"
```

## Pull Requests

1. Crea una rama para tu feature
2. Haz commits pequeños y lógicos
3. Push a tu fork
4. Abre PR con descripción clara
5. Espera revisión

```bash
git checkout -b feature/mi-feature
git add .
git commit -m "feat: describir cambios"
git push origin feature/mi-feature
```

## Troubleshooting Común

### Puerto 3000 en uso

```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Errores de imports

- Verifica la ruta correcta
- Usa alias `@/`
- Revisa capitalización (React es sensible)

### Tailwind no aplica estilos

- Asegúrate de que el archivo está en `src/`
- Verifica que uses clases válidas
- Limpia `.next`: `rm -rf .next && npm run dev`

### LocalStorage undefined (SSR)

```javascript
useEffect(() => {
  const data = localStorage.getItem("key");
}, []);
```

## Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [ES6+ Features](https://es6-features.org/)

---

¡Feliz coding! 🚀

# 🚚 Sistema de Notificaciones de Pedidos en Tiempo Real

## 📋 Resumen de Cambios Implementados

### ✅ Características Nuevas

#### 1. **Notificaciones Flotantes en Tiempo Real** 🔔

- Componente `Toast.jsx` reutilizable
- Notificaciones con auto-cierre (5 segundos)
- Tipos: success, info, warning, error, shipping
- Animación slide-in suave

#### 2. **Monitoreo Automático de Cambios** ⏱️

- Las páginas del cliente se actualizan cada 3 segundos
- Detección automática de cambios de estado
- Historial de estados con timestamps en localStorage

#### 3. **Barra de Progreso Visual** 📊

- Visualización del avance del pedido
- Porcentaje dinámico (20% → 100%)
- Gradiente de colores (azul → verde)

#### 4. **Descripciones de Estados Mejoradas** 💬

- Mensajes amigables para cada estado
- Emojis para mejor visualización
- Timestamps de cuándo salió el pedido

---

## 🔄 Flujo de Pedidos con Notificaciones

```
CLIENTE CREA PEDIDO
         ↓
    [Pendiente] ⏱️
         ↓
ALMACÉN CONFIRMA → 📨 Notificación: "Pedido confirmado ✓"
         ↓
    [Confirmado]
         ↓
ALMACÉN COMIENZA → 📨 Notificación: "¡Tu pedido se está preparando! 📦"
         ↓
    [Preparando]
         ↓
ALMACÉN ENVÍA → 📨 Notificación especial: "🚚 ¡Tu pedido salió y está en camino!"
         ↓
    [Enviando] + Timestamp ✓
         ↓
      [Entregado]
```

---

## 📁 Archivos Modificados/Creados

### **Nuevos Componentes**

- `src/components/common/Toast.jsx` - Notificaciones flotantes

### **Componentes Actualizados**

- `src/components/common/OrderCard.jsx`
  - ✨ Barra de progreso visual
  - ✨ Descripción de estado
  - ✨ Timestamp de salida

### **Páginas Actualizadas**

- `src/app/cliente/pedidos/page.js`
  - ✨ Auto-refresco cada 3 segundos
  - ✨ Monitoreo de cambios
  - ✨ Notificaciones flotantes

- `src/app/deposito/pedidos/page.js`
  - ✨ Mensajes mejorados por estado
  - ✨ Sección "Pedidos en envío"
  - ✨ Mejor feedback visual

### **Contexto Actualizado**

- `src/context/PedidosContext.jsx`
  - ✨ Historial de estados con timestamps
  - ✨ Persistencia en localStorage

### **Estilos Mejorados**

- `src/app/globals.css`
  - ✨ Animaciones: slide-in, pulse-bounce
  - ✨ Efectos visuales para notificaciones

### **Documentación**

- `NOTIFICACIONES_REALTIM.md` - Guía completa de uso

---

## 🎯 Cómo Probar

### **Escenario 1: Flujo Completo**

```
1. [Ventana 1] Cliente - login → productos → carrito → pedido
2. [Ventana 2] Almacén - login → gestión de pedidos
3. [Ventana 1] Observa notificaciones aparecer automáticamente
```

### **Escenario 2: Verificar Auto-Refresco**

```
1. Cliente crea pedido y ve "Pendiente"
2. Almacén cambia a "Confirmado"
3. Espera máximo 3 segundos → Cliente ve actualización
4. Notificación flotante aparece automáticamente
```

### **Escenario 3: Verificar Persistencia**

```
1. Cliente crea pedido
2. Recarga la página
3. El pedido debe seguir ahí con el estado anterior
4. El historial de cambios se mantiene
```

---

## 💻 Tecnologías Usadas

- **React Hooks**: `useState`, `useEffect`
- **localStorage**: Persistencia de datos
- **Tailwind CSS**: Estilos y animaciones
- **React Icons**: Iconografía (FiTruck, FiCheckCircle, etc.)
- **Next.js 16**: Framework base

---

## 🔍 Detalles Técnicos

### **Auto-refresco cada 3 segundos**

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setActualizado((prev) => prev + 1);
  }, 3000);
  return () => clearInterval(interval);
}, []);
```

### **Monitoreo de cambios de estado**

```javascript
useEffect(() => {
  pedidos.forEach((pedido) => {
    if (estadoAnterior !== pedido.estado) {
      // Mostrar notificación
      mostrarToast(mensaje, tipo);
    }
  });
}, [pedidos, estadosAnteriores]);
```

### **Historial con timestamps**

```javascript
historialEstados: [
  { estado: "pendiente", timestamp: "2026-01-20T10:00:00Z" },
  { estado: "confirmado", timestamp: "2026-01-20T10:02:00Z" },
  { estado: "enviando", timestamp: "2026-01-20T10:05:00Z" },
];
```

---

## ✨ Mejoras Visuales

- **Barra de progreso gradiente**: Azul (inicio) → Verde (fin)
- **Notificación tipo shipping**: Fondo púrpura con icono 🚚
- **Animación slide-in**: Las notificaciones entran desde la derecha
- **Auto-cierre**: Se van solos después de 5 segundos
- **Botón cerrar**: Opción manual para descartar

---

## 📊 Estados Disponibles

| Estado         | Color       | Icono     | Descripción            |
| -------------- | ----------- | --------- | ---------------------- |
| **Pendiente**  | 🟡 Amarillo | ⏱️ Reloj  | Esperando confirmación |
| **Confirmado** | 🔵 Azul     | ✓ Check   | Confirmado por almacén |
| **Preparando** | 🟠 Naranja  | 📦 Caja   | En preparación         |
| **Enviando**   | 🟣 Púrpura  | 🚚 Camión | En camino al cliente   |
| **Entregado**  | 🟢 Verde    | ✓ Check   | Entregado              |
| **Cancelado**  | 🔴 Rojo     | ✗ X       | Cancelado              |

---

## 🚀 Próximas Mejoras Sugeridas

- [ ] WebSockets para actualización real (sin polling)
- [ ] Notificaciones push del navegador
- [ ] Email/SMS cuando sale el pedido
- [ ] Mapa de seguimiento en tiempo real
- [ ] Estimación de tiempo de entrega
- [ ] Firma digital al entregar
- [ ] Foto de la entrega

---

## ✅ Checklist de Funcionamiento

- [x] Componente Toast funcional
- [x] Auto-refresco cada 3 segundos
- [x] Monitoreo de cambios de estado
- [x] Notificaciones flotantes apropiadas
- [x] Historial de estados persistente
- [x] Barra de progreso visual
- [x] Timestamps de transiciones
- [x] Sin errores de compilación
- [x] Responsive en dispositivos móviles

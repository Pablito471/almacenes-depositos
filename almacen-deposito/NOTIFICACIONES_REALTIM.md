# Sistema de Notificaciones de Pedidos en Tiempo Real

## ✨ Nuevas Características Implementadas

### 1. **Monitoreo en Tiempo Real**

- Los pedidos del cliente se actualizan automáticamente cada 3 segundos
- El sistema detecta cambios de estado de forma automática
- Las notificaciones flotantes aparecen cuando el estado cambia

### 2. **Barra de Progreso Visual**

- Cada pedido muestra una barra de progreso que indica el estado actual
- Los estados avanzan: Pendiente → Confirmado → Preparando → Enviando → Entregado
- La barra cambia de color (azul → verde) a medida que el pedido avanza

### 3. **Notificaciones Flotantes**

El cliente recibe notificaciones cuando:

- ✓ El pedido es **confirmado** por el almacén
- 📦 El pedido está **en preparación**
- 🚚 El pedido **salió del almacén** (notificación especial)

### 4. **Timestamps de Estados**

- Cada cambio de estado queda registrado con fecha y hora
- El cliente puede ver cuándo exactamente salió su pedido

---

## 🧪 Cómo Probar

### **Paso 1: Crear un Pedido**

1. Inicia sesión como **cliente**
2. Ve a "Productos" → Selecciona un almacén
3. Agrega productos al carrito
4. Realiza el pedido
5. Ir a "Mis Pedidos"

### **Paso 2: Actualizar el Estado (desde Almacén)**

1. Abre otra pestaña/ventana y inicia sesión como **deposito**
2. Ve a "Gestión de Pedidos"
3. Haz clic en el botón de acción para avanzar el estado:
   - Primer click: "Confirmar pedido"
   - Segundo click: "Comenzar preparación"
   - Tercer click: "Marcar como enviado"

### **Paso 3: Ver Notificaciones (Cliente)**

Vuelve a la pestaña del cliente y deberías ver:

- La tarjeta del pedido actualizada
- La barra de progreso avanzando
- Una notificación flotante en la esquina inferior derecha

---

## 🎯 Flujo de Estados

```
PENDIENTE (⏱️)
    ↓
CONFIRMADO (✓) - Notificación: "Pedido confirmado"
    ↓
PREPARANDO (📦) - Notificación: "Tu pedido se está preparando"
    ↓
ENVIANDO (🚚) - Notificación: "¡Tu pedido salió del almacén y está en camino!"
    ↓
ENTREGADO (✓)
```

---

## 📝 Componentes Modificados

### **OrderCard.jsx**

- Barra de progreso visual
- Descripción del estado
- Muestra cuándo salió el pedido

### **cliente/pedidos/page.js**

- Auto-refresco cada 3 segundos
- Monitoreo de cambios de estado
- Generación de notificaciones flotantes

### **deposito/pedidos/page.js**

- Mensajes mejorados para cada estado
- Sección de "Pedidos en envío" destacada
- Mejor feedback al cambiar estados

### **PedidosContext.jsx**

- Historial de estados con timestamps
- Cada cambio queda registrado

### **Toast.jsx** (Nuevo)

- Componente reutilizable para notificaciones
- Tipos: success, info, warning, error, shipping
- Auto-cierre después de 5 segundos

### **globals.css**

- Animaciones: slide-in, pulse-bounce
- Estilos para notificaciones flotantes

---

## 💡 Detalles Técnicos

**Auto-refresco:**

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setActualizado((prev) => prev + 1);
  }, 3000); // Cada 3 segundos
  return () => clearInterval(interval);
}, []);
```

**Monitoreo de cambios:**

```javascript
useEffect(() => {
  pedidos.forEach((pedido) => {
    const estadoAnterior = estadosAnteriores[pedido.id];
    if (estadoAnterior && estadoAnterior !== pedido.estado) {
      // Crear notificación
    }
  });
}, [pedidos, estadosAnteriores]);
```

**Historial persistente:**

```javascript
historialEstados: [
  { estado: "pendiente", timestamp: "2026-01-20T10:00:00Z" },
  { estado: "confirmado", timestamp: "2026-01-20T10:02:00Z" },
  // ...
];
```

---

## ✅ Checklist de Verificación

- [ ] El cliente ve su pedido inicial como "Pendiente"
- [ ] Al cambiar a "Confirmado", el cliente recibe notificación de confirmación
- [ ] Al cambiar a "Preparando", se muestra notificación con emoji 📦
- [ ] Al cambiar a "Enviando", se muestra notificación especial 🚚 con efecto
- [ ] La barra de progreso avanza correctamente en cada estado
- [ ] Las notificaciones desaparecen después de 5 segundos
- [ ] El timestamp de salida aparece cuando está en "Enviando"
- [ ] El sistema sigue funcionando después de recargar la página (datos en localStorage)

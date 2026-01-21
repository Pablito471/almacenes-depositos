# 🎯 Guía Rápida - Sistema de Notificaciones en Tiempo Real

## Lo que implementamos

### 📱 En la página de pedidos del cliente:

1. **Monitoreo automático** - Se actualiza cada 3 segundos
2. **Barra de progreso** - Muestra visualmente el avance del pedido
3. **Notificaciones flotantes** - Aparecen al cambiar de estado
4. **Timestamp de salida** - Registra cuándo salió exactamente

### 📦 En la página del almacén:

1. **Cambio de estado fácil** - Botones que avanzan: Confirmar → Preparar → Enviar
2. **Sección especial** - "Pedidos en envío" destaca pedidos ya enviados
3. **Confirmaciones mejoradas** - Mensajes claros en cada acción
4. **Feedback instantáneo** - El cliente lo ve en menos de 3 segundos

---

## 🔔 Tipos de Notificaciones

```
✓ Confirmado    → Verde claro, mensaje positivo
📦 Preparando   → Azul, emociones esperanza
🚚 Enviando     → Púrpura especial, emoji destacado
```

---

## 📊 Flujo Visual

```
┌─────────────────────────────────────────────────────┐
│  CLIENTE hace PEDIDO                                │
│  Estado: PENDIENTE ⏱️                               │
│  Progreso: ███░░░░░░░░░░░░░░░░░ (20%)              │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  ALMACÉN confirma PEDIDO                            │
│  (botón: "Confirmar pedido")                        │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  CLIENTE recibe notificación flotante 📨             │
│  "Pedido #xxx confirmado por el almacén ✓"         │
│  Estado: CONFIRMADO ✓                              │
│  Progreso: ██████░░░░░░░░░░░░░░ (40%)              │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  ALMACÉN comienza preparación                       │
│  (botón: "Comenzar preparación")                    │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  CLIENTE recibe notificación flotante 📨             │
│  "¡Tu pedido se está preparando! 📦"               │
│  Estado: PREPARANDO 📦                             │
│  Progreso: ███████████░░░░░░░░░ (60%)              │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  ALMACÉN marca como ENVIADO                         │
│  (botón: "Marcar como enviado")                     │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  CLIENTE recibe notificación especial 📨             │
│  "🚚 ¡Tu pedido salió y está en camino!"           │
│  Estado: ENVIANDO 🚚                               │
│  Progreso: ██████████████████░░░░ (80%)            │
│  ✓ Salió el 20/01/2026 a las 10:05                 │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  CLIENTE recibe PEDIDO                              │
│  Estado: ENTREGADO ✓                               │
│  Progreso: ████████████████████████ (100%)         │
└─────────────────────────────────────────────────────┘
```

---

## ⚡ Características Destacadas

### 🔄 Auto-actualización

```
Cada 3 segundos el cliente:
├─ Verifica cambios en los pedidos
├─ Compara estados anteriores con actuales
└─ Muestra notificación si hay cambio
```

### 📝 Persistencia

```
Todos los datos se guardan en localStorage:
├─ Pedidos y sus estados
├─ Carrito de compras
├─ Historial de transiciones
└─ Timestamps de cada cambio
```

### 🎨 Interfaz Amigable

```
Para el almacén:
├─ Botones claros y grandes
├─ Descripciones en español
├─ Confirmaciones antes de cambiar estado
└─ Sección visual de pedidos en envío

Para el cliente:
├─ Barra de progreso visual
├─ Notificaciones no invasivas
├─ Descripción del estado en español
└─ Timestamp de cuándo salió
```

---

## 🧪 Cómo Probarlo en 5 Minutos

1. **Abre dos navegadores** (o dos pestañas):
   - Left: Cliente (localhost:3000)
   - Right: Almacén (localhost:3000)

2. **Cliente**: Login → Productos → Compra algo → Ve "Mis Pedidos"

3. **Almacén**: Login → Gestión Pedidos → Cambia estado a "Confirmado"

4. **Cliente**: ¡Espera máximo 3 segundos! Deberías ver:
   - La tarjeta actualizada
   - La barra de progreso avanzó
   - Una notificación flotante en la esquina inferior derecha

5. **Repite** con los demás estados (Preparando → Enviando)

---

## 💾 Datos Guardados

Cada pedido ahora tiene:

```javascript
{
  id: "1234567890",
  estado: "confirmado",
  fecha: "2026-01-20T10:00:00Z",
  items: [...],
  historialEstados: [
    { estado: "pendiente", timestamp: "2026-01-20T10:00:00Z" },
    { estado: "confirmado", timestamp: "2026-01-20T10:02:00Z" }
  ]
}
```

Esto permite ver exactamente cuándo cambió cada estado.

---

## 📞 Soporte

Si los toasts no aparecen:

- Verifica que Toast.jsx esté en `src/components/common/`
- Revisa que se importe en `cliente/pedidos/page.js`
- Abre la consola (F12) para ver errores

Si el auto-refresco no funciona:

- Verifica que `setActualizado` esté en el useEffect
- Asegúrate que el intervalo es de 3000ms
- Recarga la página (Ctrl+R)

---

## 🎉 ¡Listo!

El sistema está 100% funcional. El cliente ahora puede ver en tiempo real
cuando su pedido salga del almacén. ¡Sin WebSockets, sin complicaciones!

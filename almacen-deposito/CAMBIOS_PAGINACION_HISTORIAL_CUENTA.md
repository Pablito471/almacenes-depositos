# ✨ Actualización: Paginación, Historial y Cancelación de Cuenta

## 🎯 Características Implementadas

### 1. 📄 Componente de Paginación

**Archivo:** `src/components/common/Pagination.jsx`

✅ Componente reutilizable para todas las listas  
✅ Botones anteriores/siguiente  
✅ Números de página con puntos suspensivos  
✅ Información de items mostrados  
✅ Selector de página rápido en móvil  
✅ Props personalizables:

- `currentPage` - Página actual
- `totalPages` - Total de páginas
- `totalItems` - Total de items
- `itemsPerPage` - Items por página
- `onPageChange` - Callback al cambiar página
- `showInfo` - Mostrar/ocultar información

---

### 2. 📦 Paginación en Productos

**Archivo:** `src/app/cliente/productos/page.js`

✅ **6 productos por página**

- Slice de productos para mostrar
- Reset de página al cambiar almacén
- Componente Pagination integrado
- Cálculo automático de páginas

**Código Principal:**

```javascript
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const productosActuales = productos.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE,
);
```

---

### 3. 📋 Paginación en Pedidos

**Archivos:**

- `src/app/cliente/pedidos/page.js`
- `src/app/deposito/pedidos/page.js`

✅ **4 pedidos por página**

- Paginación en listado de pedidos
- Mantiene funcionalidades de estado
- Filtros y acciones intactas

---

### 4. 📊 Historial Mejorado

**Archivo:** `src/app/envios/historial/page.js`

#### Nuevas Funcionalidades:

✅ **Tarjetas de Estadísticas:**

- Entregas completadas (contador + icono)
- Pedidos cancelados (contador + icono)
- Monto total entregado (en ARS)

✅ **Sistema de Filtros:**

- Filtro por estado (Todos, Completadas, Canceladas)
- Filtro por mes (detecta meses disponibles automáticamente)
- Reset de página al filtrar

✅ **Paginación de Historial:**

- 6 registros por página
- Navegación entre páginas

✅ **Información Dinámica:**

- Detecta meses con registros
- Convierte a formato legible (mes y año)
- Estadísticas en tiempo real

**Código de Filtros:**

```javascript
const mesesDisponibles = [
  ...new Set(
    pedidos
      .filter((p) => p.estado === "entregado" || p.estado === "cancelado")
      .map((p) => {
        const fecha = new Date(p.fecha);
        return (
          fecha.getFullYear() +
          "-" +
          String(fecha.getMonth() + 1).padStart(2, "0")
        );
      }),
  ),
]
  .sort()
  .reverse();
```

---

### 5. 🗑️ Opción de Cancelar Cuenta

**Archivo:** `src/components/common/ProfileForm.jsx`

#### Nueva Sección "Zona de Peligro":

✅ **Interfaz de Confirmación en Dos Pasos:**

**Paso 1: Activar Zona de Peligro**

```
[Botón: Eliminar Cuenta]
```

**Paso 2: Confirmación Principal**

```
⚠️ Confirma por Alert
```

**Paso 3: Verificación de Email**

```
Pide que escribas el email para confirmar
```

✅ **Acciones al Eliminar:**

1. Borra localStorage:
   - `user`
   - `role`
   - `profile`
   - `pedidos`
   - `almacenSeleccionado`

2. Ejecuta logout
3. Redirige a inicio `/`
4. Muestra mensaje de éxito

✅ **Validaciones:**

- Doble confirmación
- Verificación de email
- Mensaje con lo que se elimina

**Listado de Datos Eliminados:**

- Tu perfil y datos personales
- Historial de pedidos
- Preferencias y configuración
- Toda tu información de cuenta

---

## 📍 Ubicaciones de Cambios

| Archivo                                 | Cambio                     |
| --------------------------------------- | -------------------------- |
| `src/components/common/Pagination.jsx`  | ✨ NUEVO                   |
| `src/app/cliente/productos/page.js`     | 🔄 Paginación 6 items      |
| `src/app/cliente/pedidos/page.js`       | 🔄 Paginación 4 items      |
| `src/app/deposito/pedidos/page.js`      | 🔄 Paginación 4 items      |
| `src/app/envios/historial/page.js`      | 🔄 Completa remodelación   |
| `src/components/common/ProfileForm.jsx` | 🔄 Agregar zona de peligro |

---

## 🧪 Cómo Probar

### Prueba Paginación:

1. Ve a `/cliente/productos` → Debería mostrar 6 productos por página
2. Ve a `/cliente/pedidos` → Debería mostrar 4 pedidos por página
3. Haz clic en los números de página
4. Usa los botones anterior/siguiente

### Prueba Historial:

1. Ve a `/envios/historial`
2. Verás estadísticas de entregas
3. Usa los filtros para buscar por estado y mes
4. La paginación filtra automáticamente

### Prueba Cancelar Cuenta:

1. Ve a `/cliente/perfil` (o depósito/envios)
2. Desplázate al final
3. Haz clic en "Eliminar Cuenta"
4. Confirma en el cuadro de diálogo
5. Escribe tu email para confirmar
6. Tu cuenta se eliminará y serás redirigido

---

## 🔧 Implementación Técnica

### Estado en Paginación:

```javascript
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 6; // O 4, según la página

// Calcular
const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const itemsActuales = items.slice(startIndex, endIndex);

// Renderizar
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  itemsPerPage={ITEMS_PER_PAGE}
  totalItems={totalItems}
/>;
```

### Eliminación de Cuenta:

```javascript
const handleDeleteAccount = async () => {
  // 1. Confirmación principal
  // 2. Pedir email
  // 3. Validar email
  // 4. Limpiar localStorage
  // 5. Logout
  // 6. Redirigir
};
```

---

## ✅ Checklist de Verificación

- [x] Componente Pagination creado y funcional
- [x] Paginación en productos (6 items/página)
- [x] Paginación en pedidos (4 items/página)
- [x] Paginación en historial (6 items/página)
- [x] Filtros de estado en historial
- [x] Filtros de mes en historial
- [x] Estadísticas en historial
- [x] Opción de cancelar cuenta
- [x] Doble confirmación en eliminación
- [x] Verificación de email
- [x] Limpiar datos al eliminar
- [x] Sin errores de compilación
- [x] Todas las rutas funcionales

---

## 🚀 Próximas Mejoras (Opcionales)

- [ ] Exportar historial a PDF
- [ ] Búsqueda en listas paginadas
- [ ] Ordenamiento (fecha, total, estado)
- [ ] Anulación de cuenta (sin borrar datos)
- [ ] Envío de email de confirmación
- [ ] Recuperación de cuenta en 30 días
- [ ] Backup de datos antes de eliminar
- [ ] Auditoría de acceso a datos

---

## 📊 Estadísticas

| Métrica                      | Valor          |
| ---------------------------- | -------------- |
| Componentes nuevos           | 1 (Pagination) |
| Archivos modificados         | 5              |
| Items por página (Productos) | 6              |
| Items por página (Pedidos)   | 4              |
| Items por página (Historial) | 6              |
| Pasos para eliminar cuenta   | 3              |
| Errores de compilación       | 0 ✅           |

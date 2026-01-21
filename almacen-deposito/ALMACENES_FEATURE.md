# 🏪 Sistema de Selección de Almacenes para Clientes

## Descripción

Se ha implementado un sistema completo que permite a los clientes seleccionar entre varios almacenes registrados antes de visualizar productos y realizar pedidos.

## Cambios Realizados

### 1. **Nuevo Contexto: AlmacenesContext.jsx**

- Ubicación: `src/context/AlmacenesContext.jsx`
- Gestiona globalmente la selección del almacén
- Carga automáticamente todos los almacenes disponibles
- Persiste la selección en localStorage
- Métodos disponibles:
  - `seleccionarAlmacen(id)`: Cambiar almacén seleccionado
  - `obtenerAlmacenActual()`: Obtener datos del almacén actual
  - `almacenes`: Lista de todos los almacenes
  - `almacenSeleccionado`: ID del almacén actual
  - `loading`: Estado de carga

### 2. **Nuevo Componente: AlmacenSelector.jsx**

- Ubicación: `src/components/common/AlmacenSelector.jsx`
- Componente reutilizable con 3 variantes:
  - **grid**: Tarjetas en formato grid (recomendado para página principal)
  - **list**: Lista de almacenes con selección
  - **select**: Dropdown simple
- Muestra información detallada:
  - Nombre del almacén
  - Ubicación
  - Teléfono
  - Email
  - Horario
  - Estado (Activo/Inactivo)
- Indicador visual del almacén seleccionado

### 3. **Mejoras en authService.js**

- Se agregaron 5 almacenes en lugar de 3:
  1. **Almacén Centro** - Centro Ciudad
  2. **Almacén Norte** - Zona Norte
  3. **Almacén Zona Franca** - Zona Franca
  4. **Almacén Este** - Polígono Industrial
  5. **Almacén Sur** - Zona Sur
- Cada almacén incluye:
  - Ubicación completa
  - Teléfono
  - Email
  - Horario de atención
  - Estado operativo
- Se agregaron productos para almacenes 4 y 5

### 4. **Actualización de Header.jsx**

- Selector de almacén visible para clientes
- Dropdown en header que muestra almacén actual
- Cambio rápido de almacén sin recargar página
- Menú móvil adaptado con selector de almacenes

### 5. **Página Mejorada: cliente/productos**

- Sección dedicada a selección de almacenes al inicio
- Usa componente AlmacenSelector en formato grid
- Actualización automática de productos según almacén seleccionado
- Muestra nombre del almacén actual junto a los productos

### 6. **Layout Principal actualizado**

- Se agregó AlmacenesProvider al layout.js
- Estructura de providers:
  ```
  AuthProvider
    ↳ AlmacenesProvider
      ↳ PedidosProvider
  ```

## Características

✅ **Selección Global de Almacén**

- El almacén seleccionado persiste en toda la aplicación
- Se guarda en localStorage para mantener la preferencia

✅ **Interfaz Intuitiva**

- Selector visual y atractivo
- Información completa de cada almacén
- Indicador claro del almacén seleccionado

✅ **Múltiples Accesos**

- Selector principal en página de productos
- Acceso rápido desde el header
- Selector móvil adaptado

✅ **Persistencia**

- La selección se mantiene entre recargas
- Se sincroniza con el carrito y pedidos

## Flujo de Uso para Clientes

1. Cliente inicia sesión
2. Se redirige a `/cliente/productos`
3. Ve sección de selección de almacenes
4. Selecciona un almacén del grid
5. Se cargan productos del almacén seleccionado
6. El almacén seleccionado aparece en el header
7. Al agregar productos, se asocian al almacén seleccionado
8. Puede cambiar almacén en cualquier momento desde header o página de productos

## Datos de Prueba

### Almacenes Disponibles:

- Centro Ciudad: +34 912 345 678
- Zona Norte: +34 913 456 789
- Zona Franca: +34 934 567 890
- Polígono Industrial: +34 915 678 901
- Zona Sur: +34 916 789 012

### Credenciales Cliente Demo:

- Email: `cliente@example.com`
- Contraseña: `cliente123`

## Archivos Modificados

1. ✨ `src/context/AlmacenesContext.jsx` - **Nuevo**
2. ✨ `src/components/common/AlmacenSelector.jsx` - **Nuevo**
3. 📝 `src/services/authService.js` - Agregados almacenes y productos
4. 📝 `src/components/common/Header.jsx` - Selector de almacenes
5. 📝 `src/app/cliente/productos/page.js` - Integración de contexto
6. 📝 `src/app/layout.js` - Agregado AlmacenesProvider

## Próximas Mejoras Sugeridas

- [ ] Geolocalización: Sugerir almacén más cercano
- [ ] Disponibilidad: Mostrar stock por almacén
- [ ] Reseñas: Sistema de valoración de almacenes
- [ ] Horarios: Mostrar horario actual y próxima apertura
- [ ] Filtros avanzados: Filtrar almacenes por criterios

# Panel de Administración - Guía Rápida

## 📋 Descripción General

El panel de administración permite gestionar tres elementos principales del sistema:

- **Clientes**: Crear, editar y eliminar clientes
- **Almacenes**: Crear, editar y eliminar almacenes
- **Fletes**: Crear, editar y eliminar transportistas de fletes

## 🚀 Acceso al Panel

Para acceder al panel de administración:

1. Debe estar autenticado como usuario con rol **`admin`**
2. Dirigirse a la ruta `/admin`
3. Se mostrará el dashboard principal con tres opciones

## 👥 Gestión de Clientes

### Ruta: `/admin/clientes`

**Campos disponibles:**

- Nombre \* (requerido)
- Email \* (requerido)
- Teléfono
- Empresa
- Ciudad
- Estado (Activo, Inactivo, Suspendido)

**Acciones:**

- **Crear**: Clic en "Nuevo Cliente" y completa el formulario
- **Editar**: Clic en el ícono de lápiz en la tabla
- **Eliminar**: Clic en el ícono de papelera (pide confirmación)

## 🏢 Gestión de Almacenes

### Ruta: `/admin/almacenes`

**Campos disponibles:**

- Nombre \* (requerido)
- Ubicación \* (requerido)
- Capacidad
- Responsable
- Teléfono
- Email
- Estado (Activo, Inactivo, En mantenimiento)

**Acciones:**

- **Crear**: Clic en "Nuevo Almacén" y completa el formulario
- **Editar**: Clic en el ícono de lápiz en la tabla
- **Eliminar**: Clic en el ícono de papelera (pide confirmación)

## 🚚 Gestión de Fletes

### Ruta: `/admin/fletes`

**Campos disponibles:**

- Nombre \* (requerido)
- Empresa \* (requerido)
- Teléfono
- Email
- Ciudad
- Número de Licencia
- Tipo de Vehículo (Auto, Camioneta, Camión, Motocicleta)
- Estado (Activo, Inactivo, Suspendido)

**Acciones:**

- **Crear**: Clic en "Nuevo Flete" y completa el formulario
- **Editar**: Clic en el ícono de lápiz en la tabla
- **Eliminar**: Clic en el ícono de papelera (pide confirmación)

## 🔐 Control de Acceso

El panel de administración está protegido por:

- **Autenticación**: Solo usuarios autenticados pueden acceder
- **Autorización por rol**: Solo usuarios con rol `admin` pueden acceder
- Redireccionamiento automático si no tiene permisos

Las rutas protegidas son:

```
/admin
/admin/clientes
/admin/almacenes
/admin/fletes
```

## 📱 Características de la Interfaz

### Panel Principal (`/admin`)

- Dashboard con tarjetas de acceso rápido
- Atajos a cada sección de administración
- Información visual con íconos

### Secciones de Gestión

- **Tabla de datos**: Muestra todos los registros
- **Formulario modal**: Se abre al crear o editar
- **Contador**: Muestra la cantidad total de registros
- **Botón de crear**: Acceso rápido para crear nuevos registros

### Validaciones

- Campos obligatorios marcados con asterisco (\*)
- Validación de email en el campo de correo
- Mensajes de confirmación con SweetAlert2

## 💾 Almacenamiento

Los datos se almacenan en el contexto de React (`AdminContext`) con las siguientes operaciones:

- **Agregar**: `addCliente()`, `addAlmacen()`, `addFlete()`
- **Actualizar**: `updateCliente()`, `updateAlmacen()`, `updateFlete()`
- **Eliminar**: `deleteCliente()`, `deleteAlmacen()`, `deleteFlete()`

## 🎨 Estilos y Colores

Cada sección tiene un código de color distintivo:

- **Clientes**: Azul (#3B82F6)
- **Almacenes**: Verde (#10B981)
- **Fletes**: Púrpura (#A855F7)

## 📝 Notas Importantes

1. Las validaciones de email se realizan en el cliente
2. Los datos se almacenan en memoria (contexto de React)
3. Los cambios se pueden guardar en una base de datos integrando una API
4. Las confirmaciones de eliminación previenen errores accidentales
5. Todos los formularios tienen botón de cancelar para cerrar sin guardar

## 🔧 Integración Futura

Para persistir los datos en una base de datos:

1. Crear endpoints API para cada operación (POST, PUT, DELETE)
2. Reemplazar las funciones del contexto con llamadas a la API
3. Agregar manejo de errores de red
4. Implementar carga asincrónica de datos

## 📞 Soporte

Para más información sobre el sistema de administración, consulta:

- [AuthContext](../context/AuthContext.jsx) - Gestión de autenticación
- [AdminContext](../context/AdminContext.jsx) - Gestión de datos admin
- [routeConfig.js](../config/routeConfig.js) - Configuración de rutas

# 🎯 Referencia Rápida - Panel de Administración

## ⚡ Inicio Rápido

### 1. Acceder al Panel

```
URL: /pages/auth/login
Rol: Administrador
Email: admin@example.com
Contraseña: admin123
```

### 2. Dashboard Principal

```
/admin → Selecciona Clientes, Almacenes o Fletes
```

### 3. Gestionar Datos

```
[Nuevo] → Crear registro
✏️ → Editar registro
🗑️ → Eliminar registro
```

---

## 📂 Archivos Principales

### Contexto

- **AdminContext.jsx** - Gestión de estado (ADD, UPDATE, DELETE)
- Hook: `useAdmin()`

### Componentes

- **AdminClientesForm.jsx** - Formulario de clientes
- **AdminClientesTable.jsx** - Tabla de clientes
- **AdminAlmacenesForm.jsx** - Formulario de almacenes
- **AdminAlmacenesTable.jsx** - Tabla de almacenes
- **AdminFletesForm.jsx** - Formulario de fletes
- **AdminFletesTable.jsx** - Tabla de fletes

### Páginas

- **/admin** - Dashboard principal
- **/admin/clientes** - Gestión de clientes
- **/admin/almacenes** - Gestión de almacenes
- **/admin/fletes** - Gestión de fletes

---

## 🔑 Campos por Entidad

### 👥 Clientes

```
├─ nombre (requerido)
├─ email (requerido)
├─ telefono
├─ empresa
├─ ciudad
└─ estado [activo|inactivo|suspendido]
```

### 📦 Almacenes

```
├─ nombre (requerido)
├─ ubicacion (requerido)
├─ capacidad
├─ responsable
├─ telefono
├─ email
└─ estado [activo|inactivo|mantenimiento]
```

### 🚚 Fletes

```
├─ nombre (requerido)
├─ empresa (requerido)
├─ telefono
├─ email
├─ ciudad
├─ licencia
├─ tipoVehiculo [auto|camioneta|camion|moto]
└─ estado [activo|inactivo|suspendido]
```

---

## 🎨 Colores

| Entidad   | Color   | Código  |
| --------- | ------- | ------- |
| Clientes  | Azul    | #3B82F6 |
| Almacenes | Verde   | #10B981 |
| Fletes    | Púrpura | #A855F7 |

---

## 🔐 Rutas Protegidas

```
/admin                ← Solo admin
/admin/clientes      ← Solo admin
/admin/almacenes     ← Solo admin
/admin/fletes        ← Solo admin
```

Si no eres admin → Redireccionado a `/`

---

## 💾 Funciones CRUD

### Clientes

```javascript
const { clientes, addCliente, updateCliente, deleteCliente } = useAdmin();
```

### Almacenes

```javascript
const { almacenes, addAlmacen, updateAlmacen, deleteAlmacen } = useAdmin();
```

### Fletes

```javascript
const { fletes, addFlete, updateFlete, deleteFlete } = useAdmin();
```

---

## ✅ Validaciones

- **Campos obligatorios** marcados con `*`
- **Email válido** requerido para clientes
- **Nombre y ubicación** requeridos para almacenes
- **Nombre y empresa** requeridas para fletes
- **Confirmación** antes de eliminar

---

## 📱 Responsive

- ✅ Desktop (tablas completas)
- ✅ Tablet (scroll horizontal)
- ✅ Mobile (formularios optimizados)

---

## 🔗 URLs de Referencia

### Documentación

- [PANEL_ADMINISTRACION.md](PANEL_ADMINISTRACION.md) - Guía completa
- [ADMIN_IMPLEMENTACION.md](ADMIN_IMPLEMENTACION.md) - Resumen técnico
- [ESTRUCTURA_ADMIN.md](ESTRUCTURA_ADMIN.md) - Archivos y estructura
- [INTEGRACION_API_ADMIN.md](INTEGRACION_API_ADMIN.md) - Integración con API

### Código

- [AdminContext.jsx](src/context/AdminContext.jsx) - Contexto
- [routeConfig.js](src/config/routeConfig.js) - Rutas
- [AdminClientesForm.jsx](src/components/admin/AdminClientesForm.jsx)
- [AdminClientesTable.jsx](src/components/admin/AdminClientesTable.jsx)

---

## 🛠️ Stack Tecnológico

```
Frontend:
├─ Next.js 16.1.4
├─ React 19.2.3
├─ Tailwind CSS 4
├─ React Icons 5.5.0
└─ SweetAlert2 11.26.17

State Management:
└─ React Context API

Almacenamiento:
└─ Estado en memoria (React Context)
```

---

## 📊 Datos de Ejemplo

### Cliente

```json
{
  "id": 1,
  "nombre": "Juan García",
  "email": "juan@example.com",
  "telefono": "+34123456789",
  "empresa": "Tech Solutions",
  "ciudad": "Madrid",
  "estado": "activo",
  "fechaRegistro": "21/01/2026"
}
```

### Almacén

```json
{
  "id": 1,
  "nombre": "Almacén Central",
  "ubicacion": "Calle Principal, 123",
  "capacidad": "1000 unidades",
  "responsable": "Carlos López",
  "telefono": "+34987654321",
  "email": "almacen@example.com",
  "estado": "activo",
  "fechaCreacion": "21/01/2026"
}
```

### Flete

```json
{
  "id": 1,
  "nombre": "Miguel Rodríguez",
  "empresa": "Transportes Rápidos",
  "telefono": "+34654321098",
  "email": "miguel@example.com",
  "ciudad": "Barcelona",
  "licencia": "LIC-2023-001",
  "tipoVehiculo": "camion",
  "estado": "activo",
  "fechaRegistro": "21/01/2026"
}
```

---

## 🚀 Próximos Pasos

1. **Base de Datos** - Integrar MongoDB/PostgreSQL
2. **API** - Crear endpoints Node.js/Express
3. **Búsqueda** - Agregar búsqueda en tiempo real
4. **Filtros** - Filtrado por estado, ciudad, etc.
5. **Paginación** - Para tablas grandes
6. **Exportar** - Descargar datos en CSV
7. **Importar** - Subir datos en lote
8. **Auditoría** - Registrar cambios

---

## ❓ Preguntas Frecuentes

**P: ¿Cómo cambio las credenciales de demo?**
R: En `src/components/auth/LoginForm.jsx` busca `fillDemoCredentials()`

**P: ¿Los datos se guardan en la BD?**
R: No, actualmente se guardan en memoria. Ver [INTEGRACION_API_ADMIN.md](INTEGRACION_API_ADMIN.md)

**P: ¿Puedo agregar más campos?**
R: Sí, actualiza el formulario y la tabla en los componentes correspondientes

**P: ¿Cómo protejo las rutas?**
R: Ya están protegidas por rol en `routeConfig.js` y middleware

**P: ¿Dónde agrego validaciones?**
R: En los formularios Admin\*Form.jsx antes de enviar

---

## 📞 Soporte

- **Documentación**: Ver archivos `.md` en la carpeta raíz
- **Código**: Revisar carpeta `src/`
- **Componentes**: En `src/components/admin/`
- **Páginas**: En `src/app/admin/`

---

**Versión**: 1.0
**Fecha**: 21 de enero de 2026
**Estado**: ✅ Listo para usar

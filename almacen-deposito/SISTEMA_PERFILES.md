# 👤 Sistema de Perfiles de Usuarios

## ✨ Características Nuevas

### Perfiles Personalizables para Todos los Roles

- **Cliente**: Perfil personal con datos de entrega
- **Almacén/Depósito**: Perfil empresarial con datos fiscales
- **Envíos**: Perfil de empresa logística con datos de contacto

---

## 📁 Archivos Creados/Modificados

### Nuevas Páginas

- `src/app/cliente/perfil/page.js` - Perfil de cliente
- `src/app/deposito/perfil/page.js` - Perfil de almacén
- `src/app/envios/perfil/page.js` - Perfil de envíos

### Nuevos Componentes

- `src/components/common/ProfileForm.jsx` - Formulario reutilizable de perfil

### Contexto Actualizado

- `src/context/AuthContext.jsx` - Agregados `profile` y `updateProfile`

### Header Mejorado

- `src/components/common/Header.jsx` - Menú de perfil con foto

---

## 🎯 Funcionalidades

### Para Cliente - `/cliente/perfil`

**Datos Personales:**

- Nombre completo
- Email
- Teléfono
- DNI/RFC
- Dirección de envío
- Foto de perfil

**Características:**

- 📸 Upload de foto (base64)
- ✏️ Edición en línea
- 💾 Guardado automático en localStorage
- 👀 Vista previa de cambios

### Para Almacén - `/deposito/perfil`

**Datos Empresariales:**

- Nombre del almacén
- Email
- Teléfono
- RFC (datos fiscales)
- Razón social
- Dirección registrada
- Foto del almacén

**Características:**

- 🏢 Información empresarial
- 📋 Datos fiscales
- 📸 Logo/Foto del almacén
- 💾 Almacenamiento persistente

### Para Envíos - `/envios/perfil`

**Datos de Contacto:**

- Nombre empresa
- Email
- Teléfono
- RFC
- Dirección
- Foto/Logo
- Horario de atención

**Características:**

- 🚚 Datos para entregas
- 📱 Contacto principal
- 🕐 Disponibilidad
- 📸 Identificación visual

---

## 🎨 Interfaz Visual

### Estructura de Perfil

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌──────────┐    Nombre Completo           │
│  │  FOTO    │    Email                      │
│  │  (48px)  │    Teléfono                   │
│  │          │    DNI/RFC                    │
│  └──────────┘    Dirección                  │
│                                             │
│  [Editar Perfil]                           │
│                                             │
└─────────────────────────────────────────────┘
```

### Modo Edición

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌──────────┐    [Cambiar Foto]            │
│  │  FOTO    │    ────────────────           │
│  │  48px    │    [Nombre]                   │
│  │  EDIT    │    [Email]                    │
│  └──────────┘    [Teléfono]                 │
│                  [DNI/RFC]                  │
│                  [Dirección]                │
│                                             │
│  [Guardar Cambios] [Cancelar]              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💾 Persistencia de Datos

### localStorage Keys

```javascript
// Datos de autenticación
user = { id, email, nombre, role };
role = "cliente|deposito|envios";

// Datos de perfil (NUEVO)
profile = {
  nombre: "string",
  email: "string",
  telefono: "string",
  dni: "string",
  direccion: "string",
  empresa: "string",
  foto: "base64 string",
  role: "string",
  userId: "string",
};
```

### Estructura en AuthContext

```javascript
authState = {
  user: { id, email, nombre, role },
  role: "cliente|deposito|envios",
  profile: {
    nombre: "...",
    email: "...",
    // ... más datos
    foto: "data:image/jpeg;base64,...",
  },
  loading: boolean,
};
```

---

## 📸 Manejo de Fotos

### Conversión a Base64

```javascript
const file = e.target.files[0];
const reader = new FileReader();
reader.onloadend = () => {
  setImagePreview(reader.result); // "data:image/jpeg;base64,..."
};
reader.readAsDataURL(file);
```

### Ventajas

- ✓ No requiere servidor de imágenes
- ✓ Se guarda en localStorage
- ✓ Persiste entre sesiones
- ✓ Compatible con todos los navegadores

### Limitaciones

- ✗ Aumenta tamaño de localStorage (máx 5-10MB)
- ✗ No óptimo para imágenes grandes
- ✗ Para producción usar CDN

---

## 🔄 Flujo de Actualización de Perfil

```
1. USUARIO ABRE PERFIL
   └─ Carga desde localStorage (si existe)

2. USUARIO HACE CLIC EN "EDITAR"
   ├─ Muestra formulario con datos actuales
   └─ Permite cambio de foto

3. USUARIO CARGA FOTO
   ├─ Convierte a base64
   └─ Muestra preview

4. USUARIO COMPLETA DATOS
   └─ Valida campos requeridos

5. USUARIO HACE CLIC EN "GUARDAR"
   ├─ Valida datos
   ├─ Llama updateProfile()
   ├─ Guarda en localStorage
   └─ Muestra notificación de éxito

6. DATOS PERSISTEN
   ├─ En localStorage
   ├─ Se cargan al login
   └─ Se muestran en Header
```

---

## 🔗 Header Integration

### Foto en Header

```jsx
{
  profile?.foto ? (
    <img
      src={profile.foto}
      alt="Perfil"
      className="w-8 h-8 rounded-full object-cover border border-white"
    />
  ) : (
    <FiUser size={20} />
  );
}
```

### Menú Desplegable

```
┌──────────────────────┐
│ [👤 Mi Perfil]       │
│ [Salir]              │
└──────────────────────┘
```

---

## 🧪 Cómo Probar

### Paso 1: Crear Cuenta

1. Selecciona un rol (Cliente/Almacén/Envíos)
2. Crea cuenta con email y contraseña
3. Inicia sesión

### Paso 2: Acceder a Perfil

- **Opción A**: Click en foto/nombre en Header → "Mi Perfil"
- **Opción B**: Navega a URL directa:
  - Cliente: `/cliente/perfil`
  - Almacén: `/deposito/perfil`
  - Envíos: `/envios/perfil`

### Paso 3: Editar Perfil

1. Click en "Editar Perfil"
2. Llena campos:
   - Nombre
   - Email
   - Teléfono
   - DNI/RFC
   - Dirección
3. Click en foto para cambiar
4. Click en "Guardar Cambios"

### Paso 4: Verificar Persistencia

1. Cierra sesión
2. Inicia sesión nuevamente
3. ¡Tus datos siguen ahí!

---

## 📊 Datos por Rol

### Cliente

| Campo     | Requerido | Tipo  |
| --------- | --------- | ----- |
| Nombre    | ✓         | Text  |
| Email     | ✓         | Email |
| Teléfono  | ✓         | Tel   |
| DNI       | ✗         | Text  |
| Dirección | ✗         | Text  |
| Foto      | ✗         | Image |

### Depósito

| Campo     | Requerido | Tipo  |
| --------- | --------- | ----- |
| Nombre    | ✓         | Text  |
| Email     | ✓         | Email |
| Teléfono  | ✓         | Tel   |
| RFC       | ✓         | Text  |
| Empresa   | ✓         | Text  |
| Dirección | ✓         | Text  |
| Foto      | ✗         | Image |

### Envíos

| Campo     | Requerido | Tipo  |
| --------- | --------- | ----- |
| Nombre    | ✓         | Text  |
| Email     | ✓         | Email |
| Teléfono  | ✓         | Tel   |
| RFC       | ✓         | Text  |
| Empresa   | ✓         | Text  |
| Dirección | ✓         | Text  |
| Foto      | ✗         | Image |

---

## 🛡️ Validación

### Campos Requeridos

```javascript
const requiredFields = ["nombre", "email", "telefono"];
if (missingFields.length > 0) {
  alerts.warning("Campos requeridos", `Completa: ${missingFields.join(", ")}`);
  return;
}
```

### Email

- Validación HTML5
- Debe ser único (futuro)

### Teléfono

- Acepta cualquier formato
- Se guarda como string

### Foto

- Máximo JPEG/PNG
- Se convierte a base64
- Preview antes de guardar

---

## 🚀 Próximas Mejoras

- [ ] Validación de DNI/RFC
- [ ] Límite de tamaño de foto
- [ ] Compresión de imágenes
- [ ] Carga de múltiples documentos fiscales
- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] Historial de cambios de perfil
- [ ] Integración con base de datos real
- [ ] Sincronización con SMS/Email
- [ ] Dashboard de verificación

---

## ✅ Checklist

- [x] Páginas de perfil para 3 roles
- [x] Componente ProfileForm reutilizable
- [x] Carga de fotos (base64)
- [x] Guardado en localStorage
- [x] Foto en Header
- [x] Menú desplegable de perfil
- [x] Validación de campos
- [x] Modo edición/vista
- [x] Sin errores de compilación
- [x] Responsive en móvil

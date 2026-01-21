# 🖼️ Sistema de Imágenes de Productos

## ✨ Características Nuevas

### Productos con Imágenes

- Todos los productos ahora tienen URLs de imágenes
- Las imágenes se muestran tanto en cliente como en almacén
- Interfaz visual mejorada con vista previa

---

## 📁 Cambios Realizados

### 1. **Datos de Productos Actualizados**

**Archivo:** `src/services/authService.js`

Cada producto ahora tiene:

```javascript
{
  id: "p1",
  nombre: "Laptop Dell",
  descripcion: 'Laptop 15"',
  precio: 899.99,
  stock: 10,
  imagen: "https://images.unsplash.com/..." // ✨ NUEVO
}
```

**Imágenes por Almacén:**

| Almacén 1 | Almacén 2   | Almacén 3  | Almacén 4 | Almacén 5 |
| --------- | ----------- | ---------- | --------- | --------- |
| Laptop    | Monitor     | Cable HDMI | SSD       | Micrófono |
| Mouse     | Webcam      | Hub USB-C  | RAM       | Soporte   |
| Teclado   | Auriculares | Adaptador  | Fuente    | Regleta   |

### 2. **ProductCard Mejorado**

**Archivo:** `src/components/common/ProductCard.jsx`

Nuevas características:

- ✨ Imagen grande en la parte superior (h-48)
- 🎨 Efecto zoom al pasar el mouse
- 🔄 Fallback automático a imagen por defecto si hay error
- 📱 Totalmente responsivo

**Código:**

```jsx
{
  producto.imagen && (
    <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/...";
        }}
      />
    </div>
  );
}
```

### 3. **Gestión de Productos en Almacén**

**Archivo:** `src/app/deposito/productos/page.js`

Nueva funcionalidad:

- ✨ Campo URL de Imagen en el formulario
- 👁️ Vista previa de la imagen mientras escribes
- 🖼️ Validación de imagen (URL requerida)
- 📸 Imágenes visibles en la tarjeta del producto

**Campos del formulario:**

```
┌─────────────────────────────┐
│ Nombre del Producto         │
├─────────────────────────────┤
│ Descripción                 │
├──────────────┬──────────────┤
│ Precio (ARS) │ Stock        │
├─────────────────────────────┤
│ URL de Imagen               │
├─────────────────────────────┤
│ [Vista previa de imagen]    │
├─────────────────────────────┤
│ [Crear] [Cancelar]          │
└─────────────────────────────┘
```

---

## 🎯 Cómo Usar

### Para Cliente - Ver Productos con Imágenes

1. Inicia sesión como cliente
2. Selecciona un almacén
3. Ve a "Productos"
4. ¡Las imágenes aparecen en cada tarjeta de producto!

### Para Almacén - Agregar Producto con Imagen

1. Inicia sesión como almacén
2. Ve a "Gestión de Productos"
3. Click en "+ Agregar Producto"
4. Llena todos los campos:
   - Nombre ✓
   - Descripción ✓
   - Precio ✓
   - Stock ✓
   - **URL de Imagen** ✓ (NUEVO)
5. Verás una vista previa de la imagen
6. Click en "Crear Producto"

---

## 📸 URLs de Imágenes Públicas

Se usa **Unsplash** (servicio gratuito de imágenes):

- Dominio: `https://images.unsplash.com`
- Parámetros: `?w=500&q=80` (ancho 500px, calidad 80%)

**Ejemplos por producto:**

```
Laptop: .../photo-1588872657840-790ff3bde4c5?w=500&q=80
Mouse: .../photo-1527814050087-3793815479db?w=500&q=80
Teclado: .../photo-1587829191301-a574fdf4fbb9?w=500&q=80
Monitor: .../photo-1527864550417-7fd91fc51a46?w=500&q=80
Webcam: .../photo-1598986646514-e31f83da8c46?w=500&q=80
...y más
```

---

## 🛡️ Manejo de Errores

### ✓ Fallback Automático

Si la URL de imagen no carga:

```javascript
onError={(e) => {
  e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
}}
```

Muestra automáticamente una imagen por defecto.

### ✓ Validación en Almacén

Al crear producto:

- Valida que todos los campos estén completos
- Requiere obligatoriamente URL de imagen
- Muestra vista previa antes de guardar

---

## 🎨 Estilos Visuales

### Tarjeta de Producto (Cliente)

```
┌────────────────────┐
│                    │
│   [IMAGEN 48px]    │
│  (zoom al pasar)   │
│                    │
├────────────────────┤
│ Nombre Producto    │
│ Descripción...     │
│                    │
│ $1.234,56 ARS      │
│                    │
│ Stock: 10          │
│                    │
│ [+ Agregar]        │
└────────────────────┘
```

### Tarjeta de Producto (Almacén)

```
┌────────────────────┐
│                    │
│   [IMAGEN 48px]    │
│                    │
├────────────────────┤
│ Nombre Producto    │
│ Descripción...     │
│                    │
│ Precio: $...       │
│ Stock: ...         │
│                    │
│ [✎ Editar]         │
└────────────────────┘
```

---

## 💡 Tips & Trucos

### Usar Tus Propias Imágenes

1. Sube la imagen a un servicio como:
   - Unsplash.com
   - Pexels.com
   - Imgur.com
   - Cloudinary.com
2. Copia la URL pública
3. Pégala en el campo "URL de Imagen"
4. ¡Listo! La imagen aparecerá automáticamente

### URLs Cortas vs Largas

- ✓ URLs largas: Mejor calidad, más datos
- ✓ URLs cortas: Carga más rápido
- Unsplash permite ambas

### Altura Consistente

- Todas las imágenes muestran en `h-48` (192px)
- `object-cover` mantiene proporción
- No hay distorsión

---

## 🔄 Flujo Completo de Imágenes

```
1. ALMACÉN CREA PRODUCTO
   ├─ Llena nombre, descripción, precio, stock
   ├─ Agrega URL de imagen
   └─ Ve vista previa en tiempo real

2. IMAGEN SE GUARDA
   ├─ En el estado del producto
   └─ (En futuro: en base de datos)

3. CLIENTE VE PRODUCTO
   ├─ Abre página de productos
   ├─ Selecciona almacén
   └─ Ve imagen en la tarjeta

4. CLIENTE COMPRA
   ├─ Puede ver imagen en el carrito
   ├─ Puede ver imagen en la orden
   └─ Imagen se mantiene histórica
```

---

## 📝 Estructura de Datos

### Producto con Imagen

```javascript
{
  id: "p1",
  nombre: "Laptop Dell",
  descripcion: 'Laptop 15"',
  precio: 899.99,
  stock: 10,
  imagen: "https://images.unsplash.com/photo-1588872657840-790ff3bde4c5?w=500&q=80"
}
```

### En Carrito

```javascript
{
  id: "p1",
  nombre: "Laptop Dell",
  descripcion: 'Laptop 15"',
  precio: 899.99,
  cantidad: 1,
  deposito: "1",
  imagen: "https://images.unsplash.com/..." // Mantiene imagen
}
```

### En Pedido

```javascript
{
  id: Date.now().toString(),
  items: [
    {
      ...producto,
      imagen: "https://images.unsplash.com/..." // Histórica
    }
  ]
}
```

---

## ✅ Checklist de Implementación

- [x] Agregar campo `imagen` a mockProductos
- [x] Actualizar ProductCard con imagen
- [x] Agregar validación de imagen en almacén
- [x] Mostrar vista previa en formulario
- [x] Efecto zoom en imágenes
- [x] Fallback automático si error
- [x] Imágenes responsivas
- [x] Sin errores de compilación
- [x] Pruebas visuales completadas

---

## 🚀 Próximas Mejoras Sugeridas

- [ ] Carga de imágenes locales (file upload)
- [ ] Compresión automática de imágenes
- [ ] Galería multiple (varias fotos por producto)
- [ ] Zoom interactivo al hacer click
- [ ] Carrusel de imágenes
- [ ] Filtros por color de imagen
- [ ] Búsqueda por imagen (reverse search)

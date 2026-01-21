# Guía de Integración de Escaneres de Códigos QR y Barras

## 📋 Descripción General

La aplicación AlmacenesHub ahora está preparada para trabajar con dispositivos de lectura de códigos de barras y QR. Esto incluye:

- **Escaneres de teclado**: Dispositivos que simulan entrada de teclado
- **Cámaras de dispositivos**: Lectura de códigos QR con la cámara del dispositivo
- **Códigos de barras estándar**: UPC, EAN, CODE128, etc.

## 🔧 Componentes Disponibles

### 1. Hook `useBarcodeScanner`

Hook que captura automáticamente la entrada rápida de escaneres de teclado.

**Ubicación**: `src/hooks/useBarcodeScanner.js`

**Uso básico:**

```javascript
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";

export function MyComponent() {
  const handleBarcode = (code) => {
    console.log("Código escaneado:", code);
    // Procesar el código
  };

  const { barcode, isScanning } = useBarcodeScanner(handleBarcode);

  return (
    <div>
      {isScanning && <p>Escaneando...</p>}
      <p>Código: {barcode}</p>
    </div>
  );
}
```

**Opciones de configuración:**

```javascript
useBarcodeScanner(handleBarcode, {
  minLength: 6, // Longitud mínima del código
  maxLength: 50, // Longitud máxima del código
  scanTimeout: 200, // Tiempo máximo entre caracteres (ms)
  keyPressThreshold: 50, // Tiempo para detectar escaneo rápido (ms)
});
```

### 2. Componente `BarcodeScanner`

Modal para leer códigos QR con la cámara del dispositivo.

**Ubicación**: `src/components/common/BarcodeScanner.jsx`

**Uso:**

```javascript
import BarcodeScanner from "@/components/common/BarcodeScanner";

export function MyComponent() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <button onClick={() => setShowScanner(true)}>Abrir Cámara</button>

      {showScanner && (
        <BarcodeScanner
          onScan={(code) => {
            console.log("QR detectado:", code);
            setShowScanner(false);
          }}
          onClose={() => setShowScanner(false)}
          title="Escanear Código QR"
        />
      )}
    </>
  );
}
```

### 3. Componente `BarcodeSearchInput`

Input reutilizable con búsqueda y escaneo integrados.

**Ubicación**: `src/components/common/BarcodeSearchInput.jsx`

**Uso:**

```javascript
import BarcodeSearchInput from "@/components/common/BarcodeSearchInput";

export function ProductSearch() {
  return (
    <BarcodeSearchInput
      placeholder="Escanear o buscar producto..."
      onSearch={(code) => {
        // Buscar producto por código
        console.log("Buscando:", code);
      }}
      onBarcodeDetected={(code) => {
        // Llamado cuando se detecta un escaneo
        console.log("Escaneo detectado:", code);
      }}
      allowCamera={true}
      minLength={3}
    />
  );
}
```

## 📱 Uso con Escaneres Reales

### Escaneres de Teclado (USB, Bluetooth, etc.)

Los escaneres típicamente simulan entrada de teclado. El hook `useBarcodeScanner` los detecta automáticamente:

1. **Características detectadas**:
   - Entrada muy rápida entre caracteres (< 50ms)
   - Terminación automática con Enter o después de 200ms de inactividad
   - No requiere configuración especial

2. **Cómo usar**:
   - Conecta el escanador al dispositivo
   - Haz clic en un campo que tenga `useBarcodeScanner`
   - Apunta con el escanador y presiona el gatillo
   - El código se capturará automáticamente

3. **Ejemplo de flujo**:

```
Usuario hace clic en campo de búsqueda
↓
isScanning cambia a true (interfaz se actualiza)
↓
Usuario escanea código
↓
Hook detecta entrada rápida
↓
Después de 200ms sin entrada, procesa el código
↓
onBarcodeScanned es llamado con el resultado
↓
isScanning cambia a false
```

### Cámaras de Dispositivos (QR)

Para leer códigos QR con la cámara:

1. **Requisitos**:
   - Dispositivo con cámara
   - HTTPS (excepto en localhost)
   - Permiso del usuario

2. **Cómo usar**:
   - Haz clic en el botón de cámara 📷
   - Se abre un modal con vista de cámara
   - Apunta la cámara al código QR
   - El código se detecta automáticamente

3. **Instalación de jsQR** (opcional, para mejor soporte):

```bash
npm install jsqr
```

## 🚀 Páginas Integradas

### Cliente - Productos

- **Ruta**: `/cliente/productos`
- **Funcionalidad**: Búsqueda de productos por código de barras
- **Acción**: Muestra el producto en la lista

### Deposito - Productos

- **Ruta**: `/deposito/productos`
- **Funcionalidad**: Búsqueda rápida de productos por código
- **Acción**: Navega al detalle del producto

### Envios - Entregas

- **Ruta**: `/envios/entregas`
- **Funcionalidad**: Escaneo de códigos de pedido para confirmar entrega
- **Acción**: Marca pedido como entregado

### Cliente/Deposito - Pedidos

- **Ruta**: `/cliente/pedidos` y `/deposito/pedidos`
- **Funcionalidad**: Búsqueda de pedidos por código
- **Acción**: Muestra detalles del pedido

## 💡 Mejores Prácticas

### Para Escaneres de Teclado

1. **Formatos de código comunes**:
   - UPC: 12 dígitos
   - EAN-13: 13 dígitos
   - CODE128: Variable
   - QR: Variable

2. **Validación**:

```javascript
const isValidUPC = (code) => code.length === 12 && /^\d+$/.test(code);
const isValidEAN = (code) => code.length === 13 && /^\d+$/.test(code);
```

3. **Configurar escanador para agregar Enter al final**:
   - Generalmente viene por defecto
   - Revisa manual del escanador si no funciona

### Para Cámaras QR

1. **Buena iluminación**: Aumenta precisión
2. **Distancia**: 10-30cm del código QR
3. **Ángulo**: Perpendicular al código
4. **Reflejos**: Evita reflejos en la pantalla

## 🔐 Consideraciones de Seguridad

1. **Validación**: Siempre valida los códigos recibidos
2. **HTTPS**: Requiere HTTPS para acceso a cámara (excepto localhost)
3. **Permisos**: Solicita explícitamente permiso de cámara
4. **Sanitización**: Limpia los códigos antes de usarlos en queries

## 🐛 Solución de Problemas

### El escanador no funciona

- Verifica que el escanador esté configurado para modo de teclado
- Asegúrate de que envía Enter al final del código
- Prueba en un campo de texto normal para verificar el escanador

### La cámara no aparece

- Verifica que el sitio está en HTTPS
- Comprueba que has dado permiso de cámara
- Intenta en otro navegador

### Códigos incompletos

- Aumenta `scanTimeout` en useBarcodeScanner
- Verifica que el escanador está configurado correctamente
- Algunos escanadores pueden necesitar ajuste de velocidad

## 📚 Ejemplo Completo

```javascript
"use client";

import { useState } from "react";
import BarcodeSearchInput from "@/components/common/BarcodeSearchInput";

export default function ProductSearchPage() {
  const [results, setResults] = useState([]);

  const handleSearch = async (code) => {
    // Buscar producto
    const response = await fetch(`/api/products?code=${code}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Producto</h1>

      <BarcodeSearchInput
        placeholder="Escanea código de barras..."
        onSearch={handleSearch}
        onBarcodeDetected={(code) => {
          console.log("Código detectado:", code);
        }}
        allowCamera={true}
      />

      <div className="mt-6">
        {results.map((product) => (
          <div key={product.id} className="p-4 border rounded mb-2">
            <h3>{product.name}</h3>
            <p>Código: {product.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📝 Notas

- El hook detecta automáticamente escaneos por teclado
- Los códigos se validan por longitud mínima/máxima
- La búsqueda se ejecuta automáticamente al terminar el escaneo
- Compatible con todos los navegadores modernos
- Mobile-friendly: funciona en iOS y Android

---

**Última actualización**: 20 de enero de 2026

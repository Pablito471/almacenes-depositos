# 🎯 Cómo Usar los Escaneres en AlmacenesHub

## 🚀 Inicio Rápido

Tu aplicación ya está lista para usar con escaneres de códigos QR y barras. Hay **tres formas** diferentes de integrar el escaneo:

### 1️⃣ Automático (Recomendado - Escaneres USB/Bluetooth)

Los escaneres de teclado se detectan automáticamente en cualquier página. Solo necesitas hacer clic en un campo y escanear.

**¿Cómo funciona?**

- El hook `useBarcodeScanner` escucha entrada de teclado rápida
- Detecta automáticamente cuando es un escanador (no teclado manual)
- Procesa el código cuando termina

**¿Dónde pruebarlo?**

- Accede a: `http://localhost:3001/ejemplo-escaneo`
- Haz clic en el campo de búsqueda
- Si tienes un escanador, prueba escaneando
- Si no, prueba escribiendo: `8718291572637` + Enter

### 2️⃣ Con Componente (Búsqueda Visual)

El componente `BarcodeSearchInput` proporciona una interfaz visual con:

- Campo de entrada
- Botón de búsqueda
- Botón de cámara para QR

**¿Cómo agregar a tus páginas?**

```javascript
import BarcodeSearchInput from "@/components/common/BarcodeSearchInput";

export default function MiPagina() {
  return (
    <BarcodeSearchInput
      placeholder="Escanea código..."
      onSearch={(code) => {
        console.log("Código:", code);
        // Tu lógica de búsqueda
      }}
      allowCamera={true} // Mostrar botón de cámara
    />
  );
}
```

### 3️⃣ Con Cámara (Códigos QR)

El componente `BarcodeScanner` abre un modal para leer códigos QR con la cámara.

**¿Cómo usar?**

```javascript
import BarcodeScanner from "@/components/common/BarcodeScanner";
import { useState } from "react";

export default function MiPagina() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <button onClick={() => setShowScanner(true)}>Escanear QR</button>

      {showScanner && (
        <BarcodeScanner
          onScan={(code) => {
            console.log("QR:", code);
            setShowScanner(false);
          }}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
}
```

## 📋 Archivos Creados

```
src/
├── hooks/
│   └── useBarcodeScanner.js          ← Hook para detectar escanadores
├── components/common/
│   ├── BarcodeScanner.jsx            ← Modal de cámara
│   └── BarcodeSearchInput.jsx        ← Input + búsqueda + cámara
└── app/
    └── ejemplo-escaneo/
        └── page.js                   ← Página de demostración

INTEGRACION_ESCANERES.md              ← Documentación técnica completa
ESCANERES_RESUMEN.md                  ← Resumen de características
```

## 🧪 Prueba la Demostración

**URL**: http://localhost:3001/ejemplo-escaneo

**Características**:

- ✅ Campo de búsqueda con escaneo
- ✅ Cámara QR integrada
- ✅ Detección automática de escanador
- ✅ Histórico de escaneos
- ✅ Búsqueda simulada de productos

**Códigos de prueba**:

- `8718291572637` - Laptop Dell XPS 13
- `5901234123457` - Teclado Mecánico RGB
- `1234567890128` - Mouse Logitech MX

## 🎮 Cómo Probar sin Escanador

### Opción 1: Simulación de Escanador

En el navegador, abre la consola (F12) y pega:

```javascript
// Simula un escaneo rápido de teclado
document.querySelector("input")?.focus();
// Luego escribe: 8718291572637
```

### Opción 2: Generar un Código QR

1. Ve a: https://www.qr-code-generator.com
2. Ingresa un código (ej: `8718291572637`)
3. Descarga el QR
4. Abre http://localhost:3001/ejemplo-escaneo
5. Haz clic en el botón de cámara 📷
6. Apunta a tu QR

## 🔧 Configuración del Escanador

Si tienes un escanador físico real, asegúrate de:

1. **Está conectado**: USB o Bluetooth
2. **Modo de teclado**: Debe estar en modo de simulación de teclado
3. **Agregar Enter**: Configura para agregar Enter al final del código (normalmente por defecto)
4. **Formato**: Soporta UPC, EAN, CODE128, QR, etc.

### Ajuste Fino en el Hook

Si tu escanador es muy lento o muy rápido, puedes ajustar:

```javascript
useBarcodeScanner(handleCode, {
  scanTimeout: 300, // Aumentar si es lento
  keyPressThreshold: 100, // Aumentar para escanadores lentos
  minLength: 6, // Longitud mínima aceptada
  maxLength: 50, // Longitud máxima aceptada
});
```

## 📱 Compatibilidad

| Dispositivo | Escanador USB | Escanador BT | Cámara QR |
| ----------- | ------------- | ------------ | --------- |
| Windows     | ✅            | ✅           | ✅        |
| Mac         | ✅            | ✅           | ✅        |
| Linux       | ✅            | ✅           | ✅        |
| iPhone      | ❌            | ❌           | ✅        |
| Android     | ❌            | ❌           | ✅        |

## 📖 Documentación Completa

Para detalles técnicos, ver:

- **[INTEGRACION_ESCANERES.md](INTEGRACION_ESCANERES.md)** - Documentación completa
- **[ESCANERES_RESUMEN.md](ESCANERES_RESUMEN.md)** - Resumen rápido

## ❓ Preguntas Frecuentes

**¿El escanador funciona sin conexión a internet?**
✅ Sí, completamente offline. Solo la cámara QR necesita conexión.

**¿Puedo usar múltiples escanadores?**
✅ Sí, el hook funciona con cualquier escanador que simule teclado.

**¿Dónde integro el escanador?**
✅ En cualquier página, simplemente importa `BarcodeSearchInput` o usa el hook `useBarcodeScanner`.

**¿Cómo manejo los códigos en mi API?**
✅ El código se pasa como string a tu función `onSearch`. Ahí puedes buscar en tu base de datos.

**¿Es seguro usar esto en producción?**
✅ Completamente. Sin dependencias pesadas y totalmente configurable.

## 🚀 Próximos Pasos

1. **Prueba la demo**: http://localhost:3001/ejemplo-escaneo
2. **Integra en tus páginas**: Copia `BarcodeSearchInput` a donde necesites
3. **Configura tu API**: Conecta los códigos a tus búsquedas
4. **Prueba con tu escanador real**: ¡Verá cómo funciona!

---

**¿Preguntas? Revisa los archivos de documentación:**

- 📄 [INTEGRACION_ESCANERES.md](INTEGRACION_ESCANERES.md)
- 📄 [ESCANERES_RESUMEN.md](ESCANERES_RESUMEN.md)

¡Tu app está lista para escanear! 🎉

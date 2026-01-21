import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Hook para capturar entrada de escaneres de códigos de barras
 * Los escaneres típicamente simulan entrada de teclado muy rápida
 *
 * Uso:
 * const { barcode, isScanning } = useBarcodeScanner(handleBarcode);
 */
export function useBarcodeScanner(onBarcodeScanned, options = {}) {
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scanTimeoutRef = useRef(null);
  const lastKeyTimeRef = useRef(0);

  // Configuración
  const {
    minLength = 6, // Longitud mínima del código
    maxLength = 50, // Longitud máxima del código
    scanTimeout = 200, // Tiempo máximo entre caracteres (ms)
    keyPressThreshold = 50, // Tiempo entre pulsaciones para detectar escáner (ms)
  } = options;

  const handleKeyPress = useCallback(
    (event) => {
      const currentTime = Date.now();
      const timeSinceLastKey = currentTime - lastKeyTimeRef.current;
      lastKeyTimeRef.current = currentTime;

      // Si es Enter, procesar el código
      if (event.key === "Enter") {
        if (barcode.length >= minLength && barcode.length <= maxLength) {
          setIsScanning(false);
          onBarcodeScanned?.(barcode);
          setBarcode("");
        }
        return;
      }

      // Si el tiempo entre pulsaciones es muy corto, probablemente es un escáner
      const isLikelyScanner =
        timeSinceLastKey < keyPressThreshold && barcode.length > 0;

      // Detectar caracteres válidos para códigos de barras
      const isValidBarcode = /^[a-zA-Z0-9\-_|*.]$/.test(event.key);

      if (isValidBarcode || isLikelyScanner) {
        event.preventDefault();
        setIsScanning(true);

        const newBarcode = barcode + event.key;
        setBarcode(newBarcode);

        // Limpiar timeout anterior
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
        }

        // Si se alcanza la longitud máxima, procesar automáticamente
        if (newBarcode.length >= maxLength) {
          setIsScanning(false);
          onBarcodeScanned?.(newBarcode);
          setBarcode("");
        } else {
          // Establecer timeout para procesar si no hay más caracteres
          scanTimeoutRef.current = setTimeout(() => {
            if (newBarcode.length >= minLength) {
              setIsScanning(false);
              onBarcodeScanned?.(newBarcode);
              setBarcode("");
            } else {
              // Si es muy corto, resetear
              setBarcode("");
              setIsScanning(false);
            }
          }, scanTimeout);
        }
      }
    },
    [
      barcode,
      minLength,
      maxLength,
      scanTimeout,
      keyPressThreshold,
      onBarcodeScanned,
    ],
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [handleKeyPress]);

  return {
    barcode,
    isScanning,
    setBarcode,
  };
}

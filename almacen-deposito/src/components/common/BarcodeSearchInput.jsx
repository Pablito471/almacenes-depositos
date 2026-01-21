"use client";

import { useState, useRef } from "react";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";
import BarcodeScanner from "./BarcodeScanner";
import Button from "./Button";
import Input from "./Input";

/**
 * Componente de búsqueda con capacidad de escaneo de códigos de barras
 * Se puede usar para buscar productos, pedidos, etc.
 */
export default function BarcodeSearchInput({
  placeholder = "Escanear o buscar...",
  onSearch,
  onBarcodeDetected,
  allowCamera = true,
  minLength = 3,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const inputRef = useRef(null);

  const handleBarcodeScanned = (barcode) => {
    setSearchValue(barcode);
    onBarcodeDetected?.(barcode);
    onSearch?.(barcode);
  };

  const { isScanning } = useBarcodeScanner(handleBarcodeScanned);

  const handleSearch = () => {
    if (searchValue.length >= minLength) {
      onSearch?.(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={isScanning ? "border-2 border-yellow-400" : ""}
          />
          {isScanning && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 text-sm font-semibold">
              ⏳ Escaneando...
            </div>
          )}
        </div>

        <Button variant="primary" onClick={handleSearch} title="Buscar">
          🔍
        </Button>

        {allowCamera && (
          <Button
            variant="secondary"
            onClick={() => setShowCamera(true)}
            title="Escanear con cámara"
          >
            📷
          </Button>
        )}
      </div>

      {showCamera && (
        <BarcodeScanner
          onScan={(barcode) => {
            setSearchValue(barcode);
            onBarcodeDetected?.(barcode);
            onSearch?.(barcode);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
          title="Escanear Código QR/Barras"
        />
      )}

      {isScanning && (
        <p className="text-xs text-yellow-600 mt-1 font-medium">
          📦 Detectado escaneo por teclado...
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import BarcodeSearchInput from "@/components/common/BarcodeSearchInput";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

/**
 * Ejemplo de página con integración completa de escaneo de códigos
 * Este componente muestra cómo usar BarcodeSearchInput en una aplicación real
 */
export default function EjemploEscaneo() {
  const [searchCode, setSearchCode] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scannedCodes, setScannedCodes] = useState([]);

  // Simular búsqueda de producto
  const handleSearch = async (code) => {
    setSearchCode(code);
    setLoading(true);

    // Simular API call
    setTimeout(() => {
      const mockProducts = {
        8718291572637: {
          id: 1,
          name: "Laptop Dell XPS 13",
          code: "8718291572637",
          price: 999.99,
          category: "Electrónica",
        },
        5901234123457: {
          id: 2,
          name: "Teclado Mecánico RGB",
          code: "5901234123457",
          price: 89.99,
          category: "Accesorios",
        },
        1234567890128: {
          id: 3,
          name: "Mouse Logitech MX",
          code: "1234567890128",
          price: 49.99,
          category: "Accesorios",
        },
      };

      const result = mockProducts[code];
      if (result) {
        setResults(result);
        // Agregar a histórico de códigos escaneados
        setScannedCodes((prev) => [
          { code, timestamp: new Date(), found: true },
          ...prev.slice(0, 9),
        ]);
      } else {
        setResults(null);
        setScannedCodes((prev) => [
          { code, timestamp: new Date(), found: false },
          ...prev.slice(0, 9),
        ]);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🔍 Ejemplo: Escaneo de Productos
          </h1>
          <p className="text-gray-600 text-lg">
            Prueba los diferentes métodos de escaneo disponibles
          </p>
        </div>

        {/* Sección de Búsqueda */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Búsqueda y Escaneo</h2>
          <p className="text-gray-600 mb-4">
            Prueba escaneando uno de estos códigos:
          </p>
          <div className="bg-gray-50 p-3 rounded mb-6 font-mono text-sm space-y-1">
            <p>
              📦 <strong>Laptop</strong>: 8718291572637
            </p>
            <p>
              ⌨️ <strong>Teclado</strong>: 5901234123457
            </p>
            <p>
              🖱️ <strong>Mouse</strong>: 1234567890128
            </p>
          </div>

          <BarcodeSearchInput
            placeholder="Escanea código de barras o haz clic en 📷..."
            onSearch={handleSearch}
            onBarcodeDetected={(code) => {
              console.log("Código detectado automáticamente:", code);
            }}
            allowCamera={true}
            minLength={3}
          />

          {searchCode && (
            <p className="text-sm text-gray-600 mt-2">
              Buscando:{" "}
              <span className="font-mono font-semibold">{searchCode}</span>
            </p>
          )}
        </Card>

        {/* Resultado de búsqueda */}
        {loading ? (
          <Card className="mb-6 text-center">
            <div className="animate-pulse">
              <p>🔄 Buscando producto...</p>
            </div>
          </Card>
        ) : results ? (
          <Card className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ✅ Producto Encontrado
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Código:</strong> {results.code}
                </p>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {results.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Categoría:</strong> {results.category}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${results.price}
                </p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
            <Button
              variant="primary"
              className="mt-4 w-full"
              onClick={() => {
                alert(`Agregado al carrito: ${results.name}`);
                setResults(null);
                setSearchCode("");
              }}
            >
              Agregar al Carrito
            </Button>
          </Card>
        ) : searchCode ? (
          <Card className="mb-6 bg-gradient-to-br from-red-50 to-orange-50">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              ❌ Producto No Encontrado
            </h3>
            <p className="text-gray-600">
              El código <span className="font-mono">{searchCode}</span> no está
              en el sistema.
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                setResults(null);
                setSearchCode("");
              }}
            >
              Nueva Búsqueda
            </Button>
          </Card>
        ) : null}

        {/* Histórico de escaneos */}
        {scannedCodes.length > 0 && (
          <Card>
            <h2 className="text-2xl font-bold mb-4">
              📋 Histórico de Escaneos
            </h2>
            <div className="space-y-2">
              {scannedCodes.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded flex justify-between items-center ${
                    item.found
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div>
                    <p className="font-mono text-sm">{item.code}</p>
                    <p className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-2xl">{item.found ? "✅" : "❌"}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

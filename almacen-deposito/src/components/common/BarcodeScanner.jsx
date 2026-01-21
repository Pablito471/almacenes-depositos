"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";

/**
 * Componente para leer códigos QR y códigos de barras con la cámara
 * Usa jsQR para detectar códigos QR
 */
export default function BarcodeScanner({
  onScan,
  onClose,
  title = "Escanear Código QR/Barras",
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current && isMounted) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);
          startScanning();
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.name === "NotAllowedError"
              ? "Permiso de cámara denegado"
              : "No se pudo acceder a la cámara",
          );
          setIsLoading(false);
        }
      }
    };

    initCamera();

    return () => {
      isMounted = false;
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const startScanning = () => {
    const scan = () => {
      if (!videoRef.current || !canvasRef.current || videoRef.current.paused) {
        animationFrameRef.current = requestAnimationFrame(scan);
        return;
      }

      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );

      const imageData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );

      // Usar jsQR si está disponible (necesita ser instalado)
      if (window.jsQR) {
        const code = window.jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
        );

        if (code && code.data !== scannedCode) {
          setScannedCode(code.data);
          onScan?.(code.data);
        }
      }

      animationFrameRef.current = requestAnimationFrame(scan);
    };

    animationFrameRef.current = requestAnimationFrame(scan);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin">⏳</div>
              <p className="text-gray-600 mt-2">Inicializando cámara...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
              <p className="text-xs mt-2">
                Usa el escaneo por teclado o ingresa el código manualmente
              </p>
            </div>
          )}

          {!error && (
            <>
              {/* Video */}
              <div className="relative mb-4 rounded-lg overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-square object-cover"
                />
                {!isLoading && (
                  <div className="absolute inset-0 border-4 border-yellow-400 rounded-lg pointer-events-none">
                    {/* Esquinas del escaneo */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-400"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-400"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-400"></div>
                  </div>
                )}
              </div>

              {/* Canvas oculto */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Resultado escaneado */}
              {scannedCode && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">Código detectado:</p>
                  <p className="font-mono text-sm font-bold text-green-700 break-all">
                    {scannedCode}
                  </p>
                </div>
              )}

              {/* Instrucciones */}
              <p className="text-xs text-gray-500 text-center">
                Apunta la cámara al código QR o código de barras
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="flex-1"
          >
            Cerrar
          </Button>
          {scannedCode && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose?.();
              }}
              className="flex-1"
            >
              Confirmar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

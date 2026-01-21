"use client";

import Card from "./Card";
import Button from "./Button";
import { formatters } from "@/utils/formatters";
import { FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";

export default function OrderCard({
  pedido,
  onAction,
  actionLabel,
  showAction = true,
}) {
  const estadosProgreso = [
    "pendiente",
    "confirmado",
    "preparando",
    "enviando",
    "entregado",
  ];
  const indiceActual = estadosProgreso.indexOf(pedido.estado);
  const porcentajeProgreso =
    ((indiceActual + 1) / estadosProgreso.length) * 100;

  const getEstadoColor = (estado) => {
    const colors = {
      pendiente: "text-yellow-600 bg-yellow-50",
      confirmado: "text-blue-600 bg-blue-50",
      preparando: "text-orange-600 bg-orange-50",
      enviando: "text-purple-600 bg-purple-50",
      entregado: "text-green-600 bg-green-50",
      cancelado: "text-red-600 bg-red-50",
    };
    return colors[estado] || "text-gray-600 bg-gray-50";
  };

  const getEstadoDescripcion = (estado) => {
    const descripciones = {
      pendiente: "Esperando confirmación del almacén",
      confirmado: "Pedido confirmado",
      preparando: "El almacén está preparando tu pedido",
      enviando: "¡Tu pedido está en camino!",
      entregado: "Pedido entregado",
      cancelado: "Pedido cancelado",
    };
    return descripciones[estado] || estado;
  };

  const getEstadoIcon = (estado) => {
    const icons = {
      pendiente: <FiClock className="inline mr-1" />,
      confirmado: <FiCheckCircle className="inline mr-1" />,
      enviando: <FiTruck className="inline mr-1" />,
      entregado: <FiCheckCircle className="inline mr-1" />,
    };
    return icons[estado] || null;
  };

  const total = pedido.items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">
            Pedido #{pedido.id.slice(0, 8)}
          </p>
          <p className="text-sm text-gray-500">
            {formatters.formatDate(pedido.fecha)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(pedido.estado)}`}
        >
          {getEstadoIcon(pedido.estado)}
          {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
        </span>
      </div>

      {pedido.estado !== "cancelado" && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-gray-700">
              Estado del envío
            </p>
            <p className="text-xs text-gray-500">
              {porcentajeProgreso.toFixed(0)}%
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${porcentajeProgreso}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 italic">
            {getEstadoDescripcion(pedido.estado)}
          </p>
        </div>
      )}

      <div className="bg-gray-50 rounded p-4 mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
        {pedido.items.map((item) => (
          <div
            key={item.id}
            className="text-sm text-gray-600 flex justify-between"
          >
            <span>
              {item.nombre} x{item.cantidad}
            </span>
            <span>
              {formatters.formatCurrency(item.precio * item.cantidad)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-4">
        <p className="text-lg font-bold text-gray-900">
          Total: {formatters.formatCurrency(total)}
        </p>

        {pedido.historialEstados && pedido.historialEstados.length > 1 && (
          <div className="mt-3 pt-3 border-t">
            {pedido.estado === "enviando" && (
              <p className="text-xs text-purple-600 font-semibold">
                ✓ Salió del almacén el{" "}
                {formatters.formatDate(
                  pedido.historialEstados.find((h) => h.estado === "enviando")
                    ?.timestamp,
                )}
              </p>
            )}
          </div>
        )}
      </div>

      {showAction && (
        <Button variant="primary" size="sm" onClick={() => onAction(pedido)}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

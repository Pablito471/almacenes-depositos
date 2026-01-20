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
      </div>

      {showAction && (
        <Button variant="primary" size="sm" onClick={() => onAction(pedido)}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

"use client";

import Card from "./Card";
import Button from "./Button";
import { formatters } from "@/utils/formatters";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

export default function ProductCard({
  producto,
  onAddToCart,
  deposito,
  showPrice = true,
  showActions = true,
}) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {producto.nombre}
      </h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">
        {producto.descripcion}
      </p>

      {showPrice && (
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {formatters.formatCurrency(producto.precio)}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Stock: {producto.stock}</span>
        {deposito && (
          <span className="text-blue-600 font-semibold">{deposito}</span>
        )}
      </div>

      {showActions && producto.stock > 0 && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddToCart(producto)}
          className="w-full flex items-center justify-center gap-2"
        >
          <FiShoppingCart /> Agregar
        </Button>
      )}

      {producto.stock === 0 && (
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="w-full opacity-50 cursor-not-allowed"
        >
          Sin Stock
        </Button>
      )}
    </Card>
  );
}

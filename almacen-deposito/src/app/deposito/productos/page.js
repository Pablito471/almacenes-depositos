"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { mockProductos } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

export default function DepositoProductosPage() {
  const { loading } = useProtectedRoute("deposito");
  const [productos, setProductos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingPrices, setEditingPrices] = useState({});
  const [editingStocks, setEditingStocks] = useState({});

  useEffect(() => {
    // Para este demo, usamos los productos del depósito 1
    setProductos(mockProductos["1"] || []);
    const initialPrices = {};
    const initialStocks = {};
    (mockProductos["1"] || []).forEach((p) => {
      initialPrices[p.id] = p.precio;
      initialStocks[p.id] = p.stock;
    });
    setEditingPrices(initialPrices);
    setEditingStocks(initialStocks);
  }, []);

  const handleEditStart = (productoId) => {
    setEditingId(productoId);
  };

  const handleSaveChanges = (productoId) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === productoId
          ? {
              ...p,
              precio: parseFloat(editingPrices[productoId]) || p.precio,
              stock: parseInt(editingStocks[productoId]) || p.stock,
            }
          : p,
      ),
    );
    setEditingId(null);
    alerts.success("Guardado", "Los cambios fueron guardados correctamente");
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Gestión de Productos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <Card key={producto.id} className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {producto.nombre}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {producto.descripcion}
              </p>

              {editingId === producto.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Precio (€)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editingPrices[producto.id]}
                      onChange={(e) =>
                        setEditingPrices({
                          ...editingPrices,
                          [producto.id]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Stock
                    </label>
                    <Input
                      type="number"
                      value={editingStocks[producto.id]}
                      onChange={(e) =>
                        setEditingStocks({
                          ...editingStocks,
                          [producto.id]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleSaveChanges(producto.id)}
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      <FiSave /> Guardar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      <FiX /> Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded">
                    <div>
                      <p className="text-sm text-gray-600">Precio</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatters.formatCurrency(editingPrices[producto.id])}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {editingStocks[producto.id]}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditStart(producto.id)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <FiEdit2 /> Editar
                  </Button>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

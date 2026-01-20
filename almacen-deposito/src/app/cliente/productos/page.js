"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { loginService, mockProductos } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Select from "@/components/common/Select";
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

export default function ClienteProductosPage() {
  const { loading } = useProtectedRoute("cliente");
  const [depositos, setDepositos] = useState([]);
  const [selectedDeposito, setSelectedDeposito] = useState("");
  const [productos, setProductos] = useState([]);
  const { carrito, agregarAlCarrito, eliminarDelCarrito, crearPedido } =
    usePedidos();

  useEffect(() => {
    loadDepositos();
  }, []);

  useEffect(() => {
    if (selectedDeposito) {
      setProductos(mockProductos[selectedDeposito] || []);
    }
  }, [selectedDeposito]);

  const loadDepositos = async () => {
    try {
      const deps = await loginService.getDepositos();
      setDepositos(deps);
      if (deps.length > 0) {
        setSelectedDeposito(deps[0].id);
      }
    } catch (error) {
      alerts.error("Error", "No se pudieron cargar los depósitos");
    }
  };

  const handleAddToCart = (producto) => {
    agregarAlCarrito(producto, 1, selectedDeposito);
    alerts.success("Agregado", `${producto.nombre} fue añadido al carrito`);
  };

  const handleCheckout = async () => {
    if (carrito.length === 0) {
      alerts.warning(
        "Carrito vacío",
        "Agrega productos antes de hacer el pedido",
      );
      return;
    }

    const result = await alerts.confirm(
      "Confirmar Pedido",
      `¿Deseas confirmar tu pedido de ${carrito.length} producto(s)?`,
    );

    if (result.isConfirmed) {
      const pedidoData = {
        cliente: "Cliente Demo",
        deposito: depositos.find((d) => d.id === selectedDeposito)?.nombre,
        items: carrito,
        total: carrito.reduce(
          (sum, item) => sum + item.precio * item.cantidad,
          0,
        ),
      };

      crearPedido(pedidoData);
      alerts.success(
        "Pedido creado",
        "Tu pedido ha sido registrado correctamente",
      );
    }
  };

  const cartTotal = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productos */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Catálogo de Productos
            </h1>
            <Select
              label="Seleccionar Almacén"
              options={depositos}
              value={selectedDeposito}
              onChange={(e) => setSelectedDeposito(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                deposito={
                  depositos.find((d) => d.id === selectedDeposito)?.nombre
                }
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Carrito */}
        <div>
          <Card className="sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiShoppingCart /> Carrito ({carrito.length})
            </h2>

            {carrito.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Tu carrito está vacío
              </p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {carrito.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-sm text-gray-900">
                          {item.nombre}
                        </p>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatters.formatCurrency(item.precio)} x{" "}
                        {item.cantidad}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatters.formatCurrency(item.precio * item.cantidad)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    Total: {formatters.formatCurrency(cartTotal)}
                  </p>
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Realizar Pedido
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePedidos } from "@/context/PedidosContext";
import { useAlmacenes } from "@/context/AlmacenesContext";
import { mockProductos } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Pagination from "@/components/common/Pagination";
import ProductFilters from "@/components/common/ProductFilters";
import AlmacenSelector from "@/components/common/AlmacenSelector";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

export default function ClienteProductosPage() {
  const { loading } = useProtectedRoute("cliente");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const {
    almacenes,
    almacenSeleccionado,
    loading: loadingAlmacenes,
    seleccionarAlmacen,
    obtenerAlmacenActual,
  } = useAlmacenes();
  const { carrito, agregarAlCarrito, eliminarDelCarrito, crearPedido } =
    usePedidos();

  const productos = mockProductos[almacenSeleccionado] || [];
  const almacenActual = obtenerAlmacenActual();

  // Hook de filtros
  const {
    filters,
    updateFilter,
    resetFilters,
    filteredProducts,
    categories,
    priceRange,
    totalResults,
  } = useProductFilters(productos);

  // Reset page when warehouse changes
  useEffect(() => {
    setCurrentPage(1);
    resetFilters();
  }, [almacenSeleccionado, resetFilters]);

  // Calcular paginación
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const productosActuales = filteredProducts.slice(startIndex, endIndex);

  const handleAddToCart = (producto) => {
    agregarAlCarrito(producto, 1, almacenSeleccionado);
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
        deposito: almacenActual?.nombre,
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

  if (loading || loadingAlmacenes)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Sección de Selección de Almacenes */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Selecciona un Almacén
          </h2>
          <p className="text-gray-600 mb-6">
            Elige uno de nuestros almacenes para ver los productos disponibles
          </p>
          <AlmacenSelector
            almacenes={almacenes}
            almacenSeleccionado={almacenSeleccionado}
            onSelect={seleccionarAlmacen}
            variant="grid"
            mostrarDetalles={true}
          />
        </section>

        {/* Sección de Productos y Carrito */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filtros y Productos */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Catálogo de Productos
              </h1>
              <p className="text-gray-600">
                Almacén:{" "}
                <span className="font-semibold">{almacenActual?.nombre}</span>
              </p>
            </div>

            {/* Componente de Filtros */}
            <ProductFilters
              filters={filters}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              categories={categories}
              priceRange={priceRange}
              totalResults={totalResults}
              onApply={() => setCurrentPage(1)}
            />

            {/* Resultados */}
            {productos.length === 0 ? (
              <Card>
                <p className="text-gray-500 text-center py-8">
                  No hay productos disponibles en este almacén
                </p>
              </Card>
            ) : totalResults === 0 ? (
              <Card className="bg-yellow-50 border border-yellow-200">
                <p className="text-yellow-700 text-center py-8">
                  No hay productos que coincidan con los filtros aplicados
                </p>
                <div className="text-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={resetFilters}
                    className="mt-4"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productosActuales.map((producto) => (
                    <ProductCard
                      key={producto.id}
                      producto={producto}
                      deposito={almacenActual?.nombre}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
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
                          {formatters.formatCurrency(
                            item.precio * item.cantidad,
                          )}
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
      </div>
    </MainLayout>
  );
}

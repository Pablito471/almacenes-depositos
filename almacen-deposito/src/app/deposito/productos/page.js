"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePedidos } from "@/context/PedidosContext";
import { mockProductos } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/common/ProductCard";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import ProductFilters from "@/components/common/ProductFilters";
import { FiEdit2, FiSave, FiX, FiPlus } from "react-icons/fi";

export default function DepositoProductosPage() {
  const { loading } = useProtectedRoute("deposito");

  // Estado derivado para inicialización única
  const [state, setState] = useState(() => {
    const productosMock = mockProductos["1"] || [];
    const initialPrices = {};
    const initialStocks = {};

    productosMock.forEach((p) => {
      initialPrices[p.id] = p.precio;
      initialStocks[p.id] = p.stock;
    });

    return {
      productos: productosMock,
      editingPrices: initialPrices,
      editingStocks: initialStocks,
    };
  });

  const {
    productos,
    editingPrices: initialEditingPrices,
    editingStocks: initialEditingStocks,
  } = state;
  const [editingId, setEditingId] = useState(null);
  const [editingPrices, setEditingPrices] = useState(initialEditingPrices);
  const [editingStocks, setEditingStocks] = useState(initialEditingStocks);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
  });

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

  // Función para actualizar productos
  const setProductos = (updater) => {
    setState((prev) => {
      const newProductos =
        typeof updater === "function" ? updater(prev.productos) : updater;
      return {
        ...prev,
        productos: newProductos,
      };
    });
  };

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

  const handleAddProduct = () => {
    if (
      !newProduct.nombre ||
      !newProduct.descripcion ||
      !newProduct.precio ||
      !newProduct.stock ||
      !newProduct.categoria ||
      !newProduct.imagen
    ) {
      alerts.warning(
        "Campos requeridos",
        "Completa todos los campos incluyendo categoría e imagen",
      );
      return;
    }

    const productoId = `p${Date.now()}`;
    const nuevoProducto = {
      id: productoId,
      nombre: newProduct.nombre,
      descripcion: newProduct.descripcion,
      precio: parseFloat(newProduct.precio),
      stock: parseInt(newProduct.stock),
      categoria: newProduct.categoria,
      imagen: newProduct.imagen,
    };

    setProductos([...productos, nuevoProducto]);
    setEditingPrices({
      ...editingPrices,
      [productoId]: nuevoProducto.precio,
    });
    setEditingStocks({
      ...editingStocks,
      [productoId]: nuevoProducto.stock,
    });

    setNewProduct({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      imagen: "",
    });
    setShowNewProductForm(false);
    alerts.success("Éxito", "Producto agregado correctamente");
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Productos
          </h1>
          <Button
            variant="primary"
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            className="flex items-center gap-2"
          >
            <FiPlus /> Agregar Producto
          </Button>
        </div>

        {showNewProductForm && (
          <Card className="mb-8 bg-blue-50 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nuevo Producto
            </h2>
            <div className="space-y-4">
              <Input
                label="Nombre del Producto"
                placeholder="ej: Laptop Dell"
                value={newProduct.nombre}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nombre: e.target.value })
                }
              />

              <Input
                label="Descripción"
                placeholder="ej: Laptop 15 pulgadas"
                value={newProduct.descripcion}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, descripcion: e.target.value })
                }
              />

              <Select
                label="Categoría"
                value={newProduct.categoria}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, categoria: e.target.value })
                }
                options={[
                  { value: "", label: "Seleccionar categoría" },
                  { value: "Computadoras", label: "Computadoras" },
                  { value: "Periféricos", label: "Periféricos" },
                  { value: "Monitores", label: "Monitores" },
                  { value: "Accesorios", label: "Accesorios" },
                  { value: "Audio", label: "Audio" },
                  { value: "Cables", label: "Cables" },
                  { value: "Almacenamiento", label: "Almacenamiento" },
                  { value: "Componentes", label: "Componentes" },
                ]}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Precio (ARS)"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.precio}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, precio: e.target.value })
                  }
                />

                <Input
                  label="Stock"
                  type="number"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de Imagen
                </label>
                <Input
                  placeholder="ej: https://images.unsplash.com/..."
                  value={newProduct.imagen}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imagen: e.target.value })
                  }
                />
                {newProduct.imagen && (
                  <div className="mt-3 relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={newProduct.imagen}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={handleAddProduct}
                >
                  Crear Producto
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setShowNewProductForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Componente de Filtros */}
        <ProductFilters
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          categories={categories}
          priceRange={priceRange}
          totalResults={totalResults}
        />

        {productos.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-8">
              No hay productos disponibles
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((producto) => (
              <Card key={producto.id} className="flex flex-col overflow-hidden">
                {/* Imagen del Producto */}
                {producto.imagen && (
                  <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

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
                        Precio (ARS)
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
                          {formatters.formatCurrency(
                            editingPrices[producto.id],
                          )}
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
        )}
      </div>
    </MainLayout>
  );
}

"use client";

import { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import Input from "./Input";
import Card from "./Card";
import { FiFilter, FiX } from "react-icons/fi";

/**
 * Componente de filtros de productos
 * Incluye búsqueda, categoría, rango de precio y ordenamiento
 */
export default function ProductFilters({
  filters,
  updateFilter,
  resetFilters,
  categories = [],
  priceRange = { min: 0, max: 1000 },
  totalResults = 0,
  onApply,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply?.();
    // En mobile, cerrar después de aplicar
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Botón de filtros (Mobile) */}
      <div className="md:hidden mb-4">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2"
        >
          <FiFilter size={20} />
          Filtros
          {totalResults > 0 && (
            <span className="ml-auto bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
              {totalResults}
            </span>
          )}
        </Button>
      </div>

      {/* Panel de Filtros */}
      <Card
        className={`${
          isOpen ? "block" : "hidden"
        } md:block mb-6 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FiFilter size={20} />
            Filtros
            {totalResults > 0 && (
              <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {totalResults} resultados
              </span>
            )}
          </h3>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Búsqueda */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Buscar Producto
            </label>
            <Input
              type="text"
              placeholder="Nombre, código o descripción..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleApply()}
            />
          </div>

          {/* Categoría */}
          {categories.length > 1 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📦 Categoría
              </label>
              <Select
                value={filters.category}
                onChange={(e) => updateFilter("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "todas" ? "Todas las categorías" : cat}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {/* Ordenamiento */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ↔️ Ordenar por
            </label>
            <Select
              value={filters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
            >
              <option value="nombre">Alfabético (A-Z)</option>
              <option value="precio-asc">Precio (Menor a Mayor)</option>
              <option value="precio-desc">Precio (Mayor a Menor)</option>
              <option value="nuevo">Más Reciente</option>
            </Select>
          </div>

          {/* Rango de Precio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💰 Rango de Precio
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 block mb-1">
                    Mín: ${filters.minPrice}
                  </label>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.minPrice}
                    onChange={(e) =>
                      updateFilter("minPrice", Number(e.target.value))
                    }
                    className="w-full h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 block mb-1">
                    Máx: ${filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      updateFilter("maxPrice", Number(e.target.value))
                    }
                    className="w-full h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              <div className="bg-purple-50 p-2 rounded text-sm text-purple-700 font-semibold">
                ${filters.minPrice} - ${filters.maxPrice}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2 border-t border-gray-200">
            <Button variant="primary" className="flex-1" onClick={handleApply}>
              Aplicar Filtros
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                resetFilters();
                handleApply();
              }}
            >
              Resetear
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

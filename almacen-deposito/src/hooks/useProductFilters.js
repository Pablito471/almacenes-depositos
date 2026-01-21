import { useState, useMemo } from "react";

/**
 * Hook para gestionar filtros de productos
 * Soporta filtrado por categoría, precio, orden y búsqueda
 */
export function useProductFilters(products = []) {
  const [filters, setFilters] = useState({
    search: "",
    category: "todas",
    sortBy: "nombre", // nombre, precio-asc, precio-desc, nuevo
    minPrice: 0,
    maxPrice: 10000,
  });

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(
      products.map((p) => p.categoria || p.category || "Sin categoría"),
    );
    return ["todas", ...Array.from(cats).sort()];
  }, [products]);

  // Obtener rango de precios
  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
    const prices = products.map((p) => p.precio || p.price || 0);
    return {
      min: Math.min(...prices),
      max: Math.ceil(Math.max(...prices) / 100) * 100,
    };
  }, [products]);

  // Aplicar filtros
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtro de búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.nombre || p.name || "").toLowerCase().includes(searchLower) ||
          (p.descripcion || p.description || "")
            .toLowerCase()
            .includes(searchLower) ||
          (p.codigo || p.code || "").includes(filters.search),
      );
    }

    // Filtro de categoría
    if (filters.category !== "todas") {
      result = result.filter(
        (p) =>
          (p.categoria || p.category || "Sin categoría") === filters.category,
      );
    }

    // Filtro de precio
    result = result.filter((p) => {
      const price = p.precio || p.price || 0;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    // Ordenamiento
    switch (filters.sortBy) {
      case "nombre":
        result.sort((a, b) =>
          (a.nombre || a.name || "").localeCompare(b.nombre || b.name || ""),
        );
        break;
      case "precio-asc":
        result.sort(
          (a, b) => (a.precio || a.price || 0) - (b.precio || b.price || 0),
        );
        break;
      case "precio-desc":
        result.sort(
          (a, b) => (b.precio || b.price || 0) - (a.precio || a.price || 0),
        );
        break;
      case "nuevo":
        result.reverse(); // Asumir que el último es el más nuevo
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "todas",
      sortBy: "nombre",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredProducts,
    categories,
    priceRange,
    totalResults: filteredProducts.length,
  };
}

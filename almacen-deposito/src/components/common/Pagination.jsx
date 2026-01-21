"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "./Button";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  itemsPerPage = 10,
  totalItems = 0,
  showInfo = true,
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i == 1 ||
        i == totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Información */}
      {showInfo && totalItems > 0 && (
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-semibold">{startItem}</span> a{" "}
          <span className="font-semibold">{endItem}</span> de{" "}
          <span className="font-semibold">{totalItems}</span> resultados
        </p>
      )}

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        {/* Botón Anterior */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Página anterior"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Página siguiente"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Selector de página rápido (móvil) */}
      <div className="flex items-center gap-2 md:hidden">
        <label htmlFor="page-select" className="text-sm text-gray-600">
          Página:
        </label>
        <select
          id="page-select"
          value={currentPage}
          onChange={(e) => handlePageClick(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

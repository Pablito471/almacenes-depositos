"use client";

import { useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";
import Pagination from "@/components/common/Pagination";
import Select from "@/components/common/Select";
import Card from "@/components/common/Card";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
} from "react-icons/fi";

export default function EnviosHistorialPage() {
  const { loading } = useProtectedRoute("envios");
  const { pedidos } = usePedidos();
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroMes, setFiltroMes] = useState("todos");
  const ITEMS_PER_PAGE = 6;

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  // Obtener historial (entregas completadas y canceladas)
  let historial = pedidos.filter(
    (p) => p.estado === "entregado" || p.estado === "cancelado",
  );

  // Filtrar por estado
  if (filtroEstado !== "todos") {
    historial = historial.filter((p) => p.estado === filtroEstado);
  }

  // Filtrar por mes
  if (filtroMes !== "todos") {
    historial = historial.filter((p) => {
      const fecha = new Date(p.fecha);
      const mesAño =
        fecha.getFullYear() +
        "-" +
        String(fecha.getMonth() + 1).padStart(2, "0");
      return mesAño === filtroMes;
    });
  }

  // Calcular paginación
  const totalItems = historial.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const historialActual = historial.slice(startIndex, endIndex);

  // Estadísticas
  const totalEntregados = pedidos.filter(
    (p) => p.estado === "entregado",
  ).length;
  const totalCancelados = pedidos.filter(
    (p) => p.estado === "cancelado",
  ).length;
  const montoTotalEntregado = pedidos
    .filter((p) => p.estado === "entregado")
    .reduce((sum, p) => sum + (p.total || 0), 0);

  // Obtener meses disponibles
  const mesesDisponibles = [
    ...new Set(
      pedidos
        .filter((p) => p.estado === "entregado" || p.estado === "cancelado")
        .map((p) => {
          const fecha = new Date(p.fecha);
          return (
            fecha.getFullYear() +
            "-" +
            String(fecha.getMonth() + 1).padStart(2, "0")
          );
        }),
    ),
  ]
    .sort()
    .reverse();

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Historial de Entregas
        </h1>
        <p className="text-gray-600 mb-8">
          Visualiza el historial completo de entregas realizadas y canceladas
        </p>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-600 text-sm font-semibold mb-1">
                  Entregas Completadas
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {totalEntregados}
                </p>
              </div>
              <FiCheckCircle className="text-green-600" size={24} />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-red-600 text-sm font-semibold mb-1">
                  Pedidos Cancelados
                </p>
                <p className="text-3xl font-bold text-red-900">
                  {totalCancelados}
                </p>
              </div>
              <FiXCircle className="text-red-600" size={24} />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-600 text-sm font-semibold mb-1">
                  Monto Total Entregado
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {formatters.formatCurrency(montoTotalEntregado)}
                </p>
              </div>
              <FiTrendingUp className="text-blue-600" size={24} />
            </div>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6 bg-gray-50 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Estado"
              value={filtroEstado}
              onChange={(e) => {
                setFiltroEstado(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: "todos", label: "Todos los estados" },
                { value: "entregado", label: "Entregas Completadas" },
                { value: "cancelado", label: "Pedidos Cancelados" },
              ]}
            />

            <Select
              label="Mes"
              value={filtroMes}
              onChange={(e) => {
                setFiltroMes(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: "todos", label: "Todos los meses" },
                ...mesesDisponibles.map((mes) => ({
                  value: mes,
                  label: new Date(mes + "-01").toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric",
                  }),
                })),
              ]}
            />
          </div>
        </Card>

        {/* Historial */}
        {historialActual.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              No hay registros para mostrar
            </p>
            {historial.length === 0 && (
              <p className="text-gray-500 text-sm mt-2">
                No hay entregas completadas ni pedidos cancelados aún
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {historialActual.map((pedido) => (
                <OrderCard key={pedido.id} pedido={pedido} showAction={false} />
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
    </MainLayout>
  );
}

"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";
import Pagination from "@/components/common/Pagination";
import { alerts } from "@/utils/alerts";
import { useState } from "react";
import { FiTruck } from "react-icons/fi";

const estadosSiguientes = {
  pendiente: "confirmado",
  confirmado: "preparando",
  preparando: "enviando",
  enviando: null,
};

const mensajesEstado = {
  pendiente: "Confirmar pedido",
  confirmado: "Comenzar preparación",
  preparando: "Marcar como enviado",
  enviando: "Pedido en camino",
};

export default function DepositoPedidosPage() {
  const { loading } = useProtectedRoute("deposito");
  const { pedidos, actualizarEstadoPedido } = usePedidos();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const handleActualizarEstado = async (pedido) => {
    const siguienteEstado = estadosSiguientes[pedido.estado];
    if (!siguienteEstado) {
      alerts.warning(
        "Pedido enviado",
        "Este pedido ya ha salido del almacén y está en camino al cliente",
      );
      return;
    }

    const esEnvio = siguienteEstado === "enviando";
    const result = await alerts.confirm(
      esEnvio ? "🚚 ¡Pedido listo para salir!" : "Actualizar Estado",
      esEnvio
        ? "¿El pedido está listo para enviar al cliente?"
        : `¿Cambiar estado a "${siguienteEstado}"?`,
      esEnvio ? "success" : "info",
    );

    if (result.isConfirmed) {
      actualizarEstadoPedido(pedido.id, siguienteEstado);

      const mensajes = {
        confirmado: "Pedido confirmado correctamente",
        preparando: "Se inició la preparación del pedido",
        enviando:
          "¡Pedido marcado como enviado! El cliente recibirá una notificación",
      };

      alerts.success(
        esEnvio ? "¡Pedido en camino!" : "Actualizado",
        mensajes[siguienteEstado] || "Estado actualizado",
      );
    }
  };

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  const pedidosActivos = pedidos.filter(
    (p) => p.estado !== "entregado" && p.estado !== "cancelado",
  );

  const pedidosEnviados = pedidos.filter((p) => p.estado === "enviando");

  // Calcular paginación
  const totalItems = pedidosActivos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pedidosActuales = pedidosActivos.slice(startIndex, endIndex);

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Pedidos
        </h1>
        <p className="text-gray-600 mb-8">
          Total de pedidos activos: {pedidosActivos.length}
          {pedidosEnviados.length > 0 &&
            ` | En camino: ${pedidosEnviados.length}`}
        </p>

        {pedidosEnviados.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
              <FiTruck size={20} />
              Pedidos en envío
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pedidosEnviados.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded p-2 text-sm text-gray-700"
                >
                  <p>Pedido #{p.id.slice(0, 8)}</p>
                  <p className="text-xs text-gray-500">
                    Salió el {formatters.formatDate(p.fecha)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pedidosActivos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No hay pedidos pendientes</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidosActuales.map((pedido) => (
                <OrderCard
                  key={pedido.id}
                  pedido={pedido}
                  actionLabel={mensajesEstado[pedido.estado]}
                  onAction={handleActualizarEstado}
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
    </MainLayout>
  );
}

"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/common/Button";
import { alerts } from "@/utils/alerts";
import { useEffect, useState } from "react";
import Toast from "@/components/common/Toast";

export default function ClientePedidosPage() {
  const { loading } = useProtectedRoute("cliente");
  const { pedidos, actualizarEstadoPedido } = usePedidos();
  const [actualizado, setActualizado] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [estadosAnteriores, setEstadosAnteriores] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  // Auto-actualiza cada 3 segundos para verificar cambios en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setActualizado((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Monitorea cambios de estado en los pedidos
  useEffect(() => {
    pedidos.forEach((pedido) => {
      const estadoAnterior = estadosAnteriores[pedido.id];

      if (estadoAnterior && estadoAnterior !== pedido.estado) {
        let mensaje = "";
        let tipo = "info";

        if (pedido.estado === "confirmado") {
          mensaje = `Pedido #${pedido.id.slice(0, 8)} confirmado por el almacén ✓`;
          tipo = "success";
        } else if (pedido.estado === "preparando") {
          mensaje = `¡Tu pedido se está preparando! 📦`;
          tipo = "info";
        } else if (pedido.estado === "enviando") {
          mensaje = `🚚 ¡Tu pedido salió del almacén y está en camino!`;
          tipo = "shipping";
        }

        if (mensaje) {
          const toastId = Date.now();
          setToasts((prev) => [...prev, { id: toastId, mensaje, tipo }]);
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toastId));
          }, 5000);
        }
      }

      setEstadosAnteriores((prev) => ({
        ...prev,
        [pedido.id]: pedido.estado,
      }));
    });
  }, [pedidos, estadosAnteriores]);

  const handleCancelarPedido = async (pedido) => {
    const result = await alerts.confirm(
      "Cancelar Pedido",
      "¿Estás seguro de que deseas cancelar este pedido?",
    );

    if (result.isConfirmed) {
      actualizarEstadoPedido(pedido.id, "cancelado");
      alerts.success(
        "Pedido cancelado",
        "Tu pedido ha sido cancelado correctamente",
      );
    }
  };

  // Calcular paginación
  const totalItems = pedidos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pedidosActuales = pedidos.slice(startIndex, endIndex);

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-sm text-gray-500 mb-8">
          {pedidos.length > 0 &&
            "Los estados se actualizan automáticamente cada 3 segundos"}
        </p>

        {pedidos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No tienes pedidos aún</p>
            <Button
              variant="primary"
              className="mt-4"
              href="/cliente/productos"
            >
              Hacer un Pedido
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidosActuales.map((pedido) => (
                <OrderCard
                  key={pedido.id}
                  pedido={pedido}
                  actionLabel={
                    pedido.estado === "cancelado" ? "Cancelado" : "Cancelar"
                  }
                  showAction={
                    pedido.estado !== "cancelado" &&
                    pedido.estado !== "entregado"
                  }
                  onAction={handleCancelarPedido}
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

      {/* Renderizar toasts */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.mensaje}
            type={toast.tipo}
            duration={5000}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </MainLayout>
  );
}

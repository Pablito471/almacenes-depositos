"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";
import Button from "@/components/common/Button";
import { alerts } from "@/utils/alerts";

export default function ClientePedidosPage() {
  const { loading } = useProtectedRoute("cliente");
  const { pedidos, actualizarEstadoPedido } = usePedidos();

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

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pedidos.map((pedido) => (
              <OrderCard
                key={pedido.id}
                pedido={pedido}
                actionLabel={
                  pedido.estado === "cancelado" ? "Cancelado" : "Cancelar"
                }
                showAction={
                  pedido.estado !== "cancelado" && pedido.estado !== "entregado"
                }
                onAction={handleCancelarPedido}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

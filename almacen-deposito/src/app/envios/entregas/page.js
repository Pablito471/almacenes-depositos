"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";
import { alerts } from "@/utils/alerts";

export default function EnviosEntregasPage() {
  const { loading } = useProtectedRoute("envios");
  const { pedidos, actualizarEstadoPedido } = usePedidos();

  const handleMarcarEntregado = async (pedido) => {
    const result = await alerts.confirm(
      "Confirmar Entrega",
      `¿El pedido #${pedido.id.slice(0, 8)} ha sido entregado?`,
    );

    if (result.isConfirmed) {
      actualizarEstadoPedido(pedido.id, "entregado");
      alerts.success("Entregado", "El pedido fue marcado como entregado");
    }
  };

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  const pedidosEnvio = pedidos.filter((p) => p.estado === "enviando");
  const pedidosEntregados = pedidos.filter((p) => p.estado === "entregado");

  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Entregas Pendientes */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Entregas Pendientes
          </h1>
          <p className="text-gray-600 mb-8">Total: {pedidosEnvio.length}</p>

          {pedidosEnvio.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">
                No hay entregas pendientes
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidosEnvio.map((pedido) => (
                <OrderCard
                  key={pedido.id}
                  pedido={pedido}
                  actionLabel="Marcar como Entregado"
                  onAction={handleMarcarEntregado}
                />
              ))}
            </div>
          )}
        </div>

        {/* Entregas Completadas */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Entregas Completadas
          </h2>
          <p className="text-gray-600 mb-8">
            Total: {pedidosEntregados.length}
          </p>

          {pedidosEntregados.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">Sin entregas completadas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pedidosEntregados.map((pedido) => (
                <OrderCard key={pedido.id} pedido={pedido} showAction={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

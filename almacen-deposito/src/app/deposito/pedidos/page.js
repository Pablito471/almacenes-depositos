"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";
import { alerts } from "@/utils/alerts";

const estadosSiguientes = {
  pendiente: "confirmado",
  confirmado: "preparando",
  preparando: "enviando",
  enviando: null,
};

export default function DepositoPedidosPage() {
  const { loading } = useProtectedRoute("deposito");
  const { pedidos, actualizarEstadoPedido } = usePedidos();

  const handleActualizarEstado = async (pedido) => {
    const siguienteEstado = estadosSiguientes[pedido.estado];
    if (!siguienteEstado) {
      alerts.warning("Estado final", "Este pedido ya ha sido enviado");
      return;
    }

    const result = await alerts.confirm(
      "Actualizar Estado",
      `¿Cambiar estado a "${siguienteEstado}"?`,
    );

    if (result.isConfirmed) {
      actualizarEstadoPedido(pedido.id, siguienteEstado);
      alerts.success("Actualizado", `Estado cambió a ${siguienteEstado}`);
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

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Pedidos
        </h1>
        <p className="text-gray-600 mb-8">
          Total de pedidos activos: {pedidosActivos.length}
        </p>

        {pedidosActivos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No hay pedidos pendientes</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pedidosActivos.map((pedido) => (
              <OrderCard
                key={pedido.id}
                pedido={pedido}
                actionLabel={`Avanzar a ${Object.keys(estadosSiguientes)[Object.values(estadosSiguientes).indexOf(estadosSiguientes[pedido.estado])]}`}
                onAction={handleActualizarEstado}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

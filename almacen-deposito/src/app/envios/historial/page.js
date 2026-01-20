"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { usePedidos } from "@/context/PedidosContext";
import { formatters } from "@/utils/formatters";
import MainLayout from "@/components/layouts/MainLayout";
import OrderCard from "@/components/common/OrderCard";

export default function EnviosHistorialPage() {
  const { loading } = useProtectedRoute("envios");
  const { pedidos } = usePedidos();

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  const historial = pedidos.filter(
    (p) => p.estado === "entregado" || p.estado === "cancelado",
  );

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Historial de Entregas
        </h1>
        <p className="text-gray-600 mb-8">
          Total de entregas registradas: {historial.length}
        </p>

        {historial.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No hay historial aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {historial.map((pedido) => (
              <OrderCard key={pedido.id} pedido={pedido} showAction={false} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

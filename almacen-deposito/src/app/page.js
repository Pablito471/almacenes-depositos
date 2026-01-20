"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      // Redirigir a dashboard según rol
      const routes = {
        cliente: "/cliente/productos",
        deposito: "/deposito/productos",
        envios: "/envios/entregas",
      };
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const role = localStorage.getItem("role");
      if (role && routes[role]) {
        router.push(routes[role]);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <p className="text-gray-700 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <Card className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📦 AlmacenesHub
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Sistema integral de gestión de pedidos, almacenes y envíos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-600 mb-2">
                👥 Clientes
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Busca productos, crea pedidos y gestiona tus compras
              </p>
            </div>

            <div className="bg-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-600 mb-2">
                📦 Almacenes
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Gestiona inventario, fija precios y confirma pedidos
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-2">
                🚚 Envíos
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Gestiona entregas y mantén registro de envíos
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/pages/auth/login")}
            className="w-full"
          >
            Iniciar Sesión
          </Button>
        </Card>

        <p className="text-gray-600 text-center mt-8 text-sm">
          Sistema de gestión de pedidos © 2026 AlmacenesHub
        </p>
      </div>
    </div>
  );
}

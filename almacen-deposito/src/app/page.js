"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Solo renderizar después de que el componente esté montado en el cliente
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mx-auto mb-4 animate-bounce-soft"></div>
          <p className="text-gray-700 text-lg font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl animate-fade-in-up">
        <Card className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-float">
            📦 AlmacenesHub
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 font-semibold">
            Sistema integral de gestión de pedidos, almacenes y envíos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-200 hover-lift hover:shadow-lg">
              <h3 className="text-xl font-bold text-green-700 mb-2">
                👥 Clientes
              </h3>
              <p className="text-green-600 text-sm mb-4">
                Busca productos, crea pedidos y gestiona tus compras
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-xl border-2 border-cyan-200 hover-lift hover:shadow-lg">
              <h3 className="text-xl font-bold text-cyan-700 mb-2">
                📦 Almacenes
              </h3>
              <p className="text-cyan-600 text-sm mb-4">
                Gestiona inventario, fija precios y confirma pedidos
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-xl border-2 border-yellow-200 hover-lift hover:shadow-lg">
              <h3 className="text-xl font-bold text-orange-700 mb-2">
                🚚 Envíos
              </h3>
              <p className="text-orange-600 text-sm mb-4">
                Gestiona entregas y mantén registro de envíos
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/pages/auth/login")}
            className="w-full md:w-64 mx-auto block hover-scale"
          >
            Iniciar Sesión →
          </Button>
        </Card>

        <p className="text-gray-700 text-center mt-8 text-sm font-medium">
          Sistema de gestión de pedidos © 2026 AlmacenesHub
        </p>
      </div>
    </div>
  );
}

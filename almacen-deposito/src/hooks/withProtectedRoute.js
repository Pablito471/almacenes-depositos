"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import AccessDenied from "@/components/common/AccessDenied";
import MainLayout from "@/components/layouts/MainLayout";

/**
 * HOC para proteger componentes de página
 * @param {React.ComponentType} Component - Componente a proteger
 * @param {string} requiredRole - Rol requerido ("cliente", "deposito", "envios")
 * @returns {React.ComponentType} Componente protegido
 */
export function withProtectedRoute(Component, requiredRole = null) {
  return function ProtectedComponent(props) {
    const { loading, user, role, isAuthorized } =
      useProtectedRoute(requiredRole);

    if (loading) {
      return (
        <MainLayout>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </div>
        </MainLayout>
      );
    }

    if (!user) {
      return <AccessDenied reason="not-authenticated" />;
    }

    if (requiredRole && role !== requiredRole) {
      return <AccessDenied reason="wrong-role" />;
    }

    if (!isAuthorized) {
      return <AccessDenied reason="access-denied" />;
    }

    return <Component {...props} />;
  };
}

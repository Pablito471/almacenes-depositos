import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useProtectedRoute(requiredRole = null) {
  const router = useRouter();
  const { user, loading, role } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Si no hay usuario autenticado, redirigir a login
    if (!user) {
      router.push("/pages/auth/login");
      return;
    }

    // Si se requiere un rol específico y no coincide, redirigir a home
    if (requiredRole && role !== requiredRole) {
      router.push("/");
      return;
    }
  }, [user, loading, role, requiredRole, router]);

  // Usuario está autorizado si está cargado, tiene usuario y rol coincide
  const isAuthorized =
    !loading && user && (!requiredRole || role === requiredRole);

  return {
    loading,
    user,
    role,
    isAuthorized,
  };
}

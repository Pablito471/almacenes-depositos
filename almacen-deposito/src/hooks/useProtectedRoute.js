import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useProtectedRoute(requiredRole = null) {
  const router = useRouter();
  const { user, loading, role } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    } else if (!loading && requiredRole && role !== requiredRole) {
      router.push("/");
    }
  }, [user, loading, role, requiredRole, router]);

  return { loading, user, role };
}

import { useRouter } from "next/router";
import authService from "../services/authService";
import { Button } from "./Button";

export const Navbar = () => {
  const router = useRouter();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Almacenes</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>
                {user.nombre} ({user.tipo})
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => router.push("/login")}>
                Iniciar sesión
              </Button>
              <Button onClick={() => router.push("/register")}>
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

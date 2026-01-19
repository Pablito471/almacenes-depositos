import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar.jsx";
import authService from "../services/authService.jsx";
import { Button } from "../components/Button.jsx";
import { Card } from "../components/Card.jsx";

export default function Home() {
  const router = useRouter();
  const user = authService.getCurrentUser();

  if (user) {
    const dashboardPath = {
      cliente: "/cliente/dashboard",
      deposito: "/deposito/dashboard",
      envios: "/envios/dashboard",
    };

    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Card className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Bienvenido, {user.nombre}
            </h1>
            <p className="text-gray-600 mb-6">
              Tu rol: <strong>{user.tipo}</strong>
            </p>
            <Button
              onClick={() => router.push(dashboardPath[user.tipo])}
              size="lg"
            >
              Ir al Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Sistema de Almacenes y Depósitos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Cliente",
              description: "Realiza pedidos y gestiona tus compras",
              path: "/register?tipo=cliente",
            },
            {
              title: "Depósito",
              description: "Gestiona productos y pedidos",
              path: "/register?tipo=deposito",
            },
            {
              title: "Envíos",
              description: "Gestiona envíos y entregas",
              path: "/register?tipo=envios",
            },
          ].map((role) => (
            <Card key={role.title}>
              <h2 className="text-xl font-bold mb-2">{role.title}</h2>
              <p className="text-gray-600 mb-4">{role.description}</p>
              <Button onClick={() => router.push(role.path)} className="w-full">
                Registrarse como {role.title}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

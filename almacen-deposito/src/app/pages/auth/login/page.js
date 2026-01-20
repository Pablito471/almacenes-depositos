"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginService } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

const roles = [
  { id: "cliente", nombre: "Cliente" },
  { id: "deposito", nombre: "Almacén" },
  { id: "envios", nombre: "Envíos" },
];

export default function LoginPage() {
  const [step, setStep] = useState("role"); // role, login
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSelectRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      alerts.warning("Selecciona un rol", "Por favor elige un tipo de usuario");
      return;
    }
    setStep("login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alerts.warning(
        "Campos requeridos",
        "Por favor completa todos los campos",
      );
      return;
    }

    setLoading(true);
    alerts.loading("Iniciando sesión...");

    try {
      const user = await loginService.login(email, password, selectedRole);
      login(user, selectedRole);
      alerts.success("Bienvenido", `Sesión iniciada correctamente`);

      // Redirigir según rol
      const routes = {
        cliente: "/cliente/productos",
        deposito: "/deposito/productos",
        envios: "/envios/entregas",
      };
      router.push(routes[selectedRole]);
    } catch (error) {
      alerts.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Credenciales de prueba para facilitar login
  const fillDemoCredentials = () => {
    const demos = {
      cliente: { email: "cliente@example.com", password: "cliente123" },
      deposito: { email: "deposito@example.com", password: "deposito123" },
      envios: { email: "envios@example.com", password: "envios123" },
    };
    const demo = demos[selectedRole];
    setEmail(demo.email);
    setPassword(demo.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📦 AlmacenesHub
          </h1>
          <p className="text-gray-600">Sistema de Gestión de Pedidos</p>
        </div>

        {step === "role" ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              ¿Quién eres?
            </h2>

            <div className="space-y-3 mb-6">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={handleSelectRole}
                    className="w-4 h-4 mr-3"
                  />
                  <span className="font-semibold text-gray-900">
                    {role.nombre}
                  </span>
                </label>
              ))}
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep("role")}
              className="text-blue-600 hover:text-blue-700 text-sm mb-4 font-semibold"
            >
              ← Cambiar rol
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                disabled={loading}
              />

              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                <p className="font-semibold text-gray-900 mb-2">
                  Credenciales de Prueba:
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fillDemoCredentials}
                  className="w-full text-left"
                  disabled={loading}
                >
                  Cargar datos de demo
                </Button>
              </div>

              <Button
                variant="primary"
                className="w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

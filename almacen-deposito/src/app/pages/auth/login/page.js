"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { alerts } from "@/utils/alerts";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const roles = [
  { id: "cliente", nombre: "👥 Cliente", descripcion: "Compra productos" },
  {
    id: "deposito",
    nombre: "📦 Almacén",
    descripcion: "Gestiona inventario",
  },
  {
    id: "envios",
    nombre: "🚚 Envíos",
    descripcion: "Coordina entregas",
  },
];

export default function LoginPage() {
  const [step, setStep] = useState("role"); // role, auth
  const [selectedRole, setSelectedRole] = useState("");
  const [authMode, setAuthMode] = useState("login"); // login, register
  const { login, user, role, loading } = useAuth();
  const router = useRouter();

  // Si el usuario ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (!loading && user && role) {
      const routes = {
        cliente: "/cliente/productos",
        deposito: "/deposito/productos",
        envios: "/envios/entregas",
      };
      if (routes[role]) {
        router.push(routes[role]);
      }
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mx-auto mb-4 animate-bounce-soft"></div>
          <p className="text-gray-700 font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleSelectRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      alerts.warning("Selecciona un rol", "Por favor elige un tipo de usuario");
      return;
    }
    setStep("auth");
  };

  const handleAuthSuccess = (user) => {
    login(user, selectedRole);
    const routes = {
      cliente: "/cliente/productos",
      deposito: "/deposito/productos",
      envios: "/envios/entregas",
    };
    router.push(routes[selectedRole]);
  };

  const handleToggleMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  const handleBackToRole = () => {
    setStep("role");
    setAuthMode("login");
    setSelectedRole("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8 animate-fade-in-up">
      <Card className="w-full max-w-md shadow-soft-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-float">
            📦 AlmacenesHub
          </h1>
          <p className="text-gray-700 font-semibold">
            Sistema Integral de Gestión de Almacenes
          </p>
        </div>

        {step === "role" ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">¿Quién eres?</h2>
              <button
                onClick={() => router.push("/")}
                className="text-gray-500 hover:text-purple-600 hover:scale-125 text-2xl transition-smooth"
                title="Volver atrás"
              >
                ←
              </button>
            </div>
            <p className="text-gray-700 mb-6 font-semibold">
              Selecciona tu tipo de cuenta para continuar
            </p>

            <div className="space-y-3 mb-8">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-smooth hover-lift ${
                    selectedRole === role.id
                      ? "border-purple-400 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg"
                      : "border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={handleSelectRole}
                    className="w-4 h-4 mr-4 accent-purple-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{role.nombre}</p>
                    <p className="text-sm text-gray-600">{role.descripcion}</p>
                  </div>
                </label>
              ))}
            </div>

            <Button
              variant="primary"
              className="w-full py-3 text-lg"
              onClick={handleContinue}
            >
              Continuar →
            </Button>
          </>
        ) : (
          <>
            <button
              onClick={handleBackToRole}
              className="text-purple-600 hover:text-purple-800 text-sm mb-6 font-semibold flex items-center gap-1 transition-smooth hover:scale-110"
            >
              ← Cambiar rol
            </button>

            {authMode === "login" ? (
              <LoginForm
                selectedRole={selectedRole}
                onSuccess={handleAuthSuccess}
                onToggleMode={handleToggleMode}
              />
            ) : (
              <RegisterForm
                selectedRole={selectedRole}
                onSuccess={handleAuthSuccess}
                onToggleMode={handleToggleMode}
              />
            )}
          </>
        )}
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-700 text-sm font-semibold">
        <p>© 2026 AlmacenesHub. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

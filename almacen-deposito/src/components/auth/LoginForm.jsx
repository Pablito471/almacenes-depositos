"use client";

import { useState } from "react";
import { loginService } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function LoginForm({ selectedRole, onSuccess, onToggleMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      alerts.success("Bienvenido", "Sesión iniciada correctamente");
      onSuccess(user);
    } catch (error) {
      alerts.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    const demos = {
      cliente: { email: "cliente@example.com", password: "cliente123" },
      deposito: { email: "deposito@example.com", password: "deposito123" },
      envios: { email: "envios@example.com", password: "envios123" },
      admin: { email: "admin@example.com", password: "admin123" },
    };
    const demo = demos[selectedRole];
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
    }
  };

  const getRoleLabel = () => {
    const labels = {
      cliente: "Cliente",
      deposito: "Almacén",
      envios: "Personal de Envíos",
      admin: "Administrador",
    };
    return labels[selectedRole] || selectedRole;
  };

  return (
    <>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">
          Iniciando sesión como:{" "}
          <span className="font-semibold text-blue-900">{getRoleLabel()}</span>
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          disabled={loading}
          required
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
          disabled={loading}
          required
        />

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-green-900 mb-3">
            💡 Credenciales de Prueba
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={fillDemoCredentials}
            className="w-full justify-start text-green-700 hover:bg-green-100"
            disabled={loading}
          >
            Cargar datos de demostración
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

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-4">
          ¿No tienes cuenta?
        </p>
        <Button
          variant="ghost"
          className="w-full"
          onClick={onToggleMode}
          disabled={loading}
        >
          Crear una cuenta
        </Button>
      </div>
    </>
  );
}

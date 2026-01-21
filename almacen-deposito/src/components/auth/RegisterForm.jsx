"use client";

import { useState } from "react";
import { loginService } from "@/services/authService";
import { alerts } from "@/utils/alerts";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function RegisterForm({
  selectedRole,
  onSuccess,
  onToggleMode,
}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password || !confirmPassword) {
      alerts.warning(
        "Campos requeridos",
        "Por favor completa todos los campos",
      );
      return;
    }

    if (password.length < 6) {
      alerts.warning(
        "Contraseña débil",
        "La contraseña debe tener al menos 6 caracteres",
      );
      return;
    }

    if (password !== confirmPassword) {
      alerts.warning(
        "Contraseñas no coinciden",
        "Las contraseñas deben ser iguales",
      );
      return;
    }

    setLoading(true);
    alerts.loading("Creando cuenta...");

    try {
      const user = await loginService.register(
        nombre,
        email,
        password,
        selectedRole,
      );
      alerts.success(
        "Cuenta creada",
        `¡Bienvenido ${nombre}! Tu cuenta ha sido creada exitosamente`,
      );
      onSuccess(user);
    } catch (error) {
      alerts.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleLabel = () => {
    const labels = {
      cliente: "Cliente",
      deposito: "Almacén",
      envios: "Personal de Envíos",
    };
    return labels[selectedRole] || selectedRole;
  };

  return (
    <>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">
          Registrarse como:{" "}
          <span className="font-semibold text-blue-900">{getRoleLabel()}</span>
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre Completo"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre completo"
          disabled={loading}
          required
        />

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
          placeholder="Mínimo 6 caracteres"
          disabled={loading}
          required
        />

        <Input
          label="Confirmar Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repite tu contraseña"
          disabled={loading}
          required
        />

        <Button
          variant="primary"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-4">
          ¿Ya tienes cuenta?
        </p>
        <Button
          variant="ghost"
          className="w-full"
          onClick={onToggleMode}
          disabled={loading}
        >
          Iniciar sesión
        </Button>
      </div>
    </>
  );
}

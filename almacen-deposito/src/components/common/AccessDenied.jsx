"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { FiLock, FiArrowLeft } from "react-icons/fi";

export default function AccessDenied({ reason = "access-denied" }) {
  const router = useRouter();

  const messages = {
    "not-authenticated": {
      title: "Acceso Denegado",
      message: "Debes iniciar sesión para acceder a esta página.",
      action: "Ir a Login",
      href: "/pages/auth/login",
    },
    "wrong-role": {
      title: "Rol Insuficiente",
      message: "No tienes permisos para acceder a esta sección.",
      action: "Volver al Inicio",
      href: "/",
    },
    "access-denied": {
      title: "Acceso Denegado",
      message: "No tienes permisos para acceder a esta página.",
      action: "Volver",
      href: "/",
    },
  };

  const config = messages[reason] || messages["access-denied"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full">
            <FiLock size={48} className="text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {config.title}
        </h1>

        <p className="text-gray-600 mb-8">{config.message}</p>

        <Button
          variant="primary"
          onClick={() => router.push(config.href)}
          className="flex items-center justify-center gap-2"
        >
          <FiArrowLeft /> {config.action}
        </Button>

        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
        >
          <FiArrowLeft size={16} /> Atrás
        </button>
      </div>
    </div>
  );
}

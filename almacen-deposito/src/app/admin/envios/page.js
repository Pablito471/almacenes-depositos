"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiLogOut } from "react-icons/fi";
import AdminEnviosForm from "@/components/admin/AdminEnviosForm";
import AdminEnviosTable from "@/components/admin/AdminEnviosTable";

export default function AdminEnviosPage() {
  const { role, loading, logout } = useAuth();
  const { envios } = useAdmin();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [envioEditando, setEnvioEditando] = useState(null);

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.push("/");
    }
  }, [role, loading, router]);

  const handleEdit = (envio) => {
    setEnvioEditando(envio);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEnvioEditando(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-gray-200 rounded transition"
              >
                <FiArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Gestión de Envíos
                </h1>
                <p className="text-gray-600">
                  Total de transportistas: {envios.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FiLogOut size={20} />
              Cerrar Sesión
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
            >
              <FiPlus size={20} />
              Nuevo Envío
            </button>
          </div>
        </div>

        {/* Formulario Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <AdminEnviosForm
                envioActual={envioEditando}
                onClose={handleClose}
              />
            </div>
          </div>
        )}

        {/* Tabla */}
        <div className="mt-8">
          <AdminEnviosTable envios={envios} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}

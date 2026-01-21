"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiLogOut } from "react-icons/fi";
import AdminClientesForm from "@/components/admin/AdminClientesForm";
import AdminClientesTable from "@/components/admin/AdminClientesTable";

export default function AdminClientesPage() {
  const { role, loading, logout } = useAuth();
  const { clientes } = useAdmin();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.push("/");
    }
  }, [role, loading, router]);

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setClienteEditando(null);
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
                  Gestión de Clientes
                </h1>
                <p className="text-gray-600">
                  Total de clientes: {clientes.length}
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
            >
              <FiPlus size={20} />
              Nuevo Cliente
            </button>
          </div>
        </div>

        {/* Formulario Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <AdminClientesForm
                clienteActual={clienteEditando}
                onClose={handleClose}
              />
            </div>
          </div>
        )}

        {/* Tabla */}
        <div className="mt-8">
          <AdminClientesTable clientes={clientes} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}

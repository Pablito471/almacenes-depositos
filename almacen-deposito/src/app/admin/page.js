"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FiUsers, FiBox, FiTruck, FiLogOut } from "react-icons/fi";

export default function AdminPage() {
  const { role, loading, logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.push("/");
    }
  }, [role, loading, router]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-lg text-gray-600">
              Gestiona clientes, almacenes y envíos
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FiLogOut size={20} />
            Cerrar Sesión
          </button>
        </div>

        {/* Grid de Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Clientes Card */}
          <Link href="/admin/clientes">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-t-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <FiUsers className="w-12 h-12 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  Gestionar
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Clientes
              </h2>
              <p className="text-gray-600">
                Crear, editar y eliminar clientes del sistema
              </p>
            </div>
          </Link>

          {/* Almacenes Card */}
          <Link href="/admin/almacenes">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-t-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <FiBox className="w-12 h-12 text-green-500" />
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded">
                  Gestionar
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Almacenes
              </h2>
              <p className="text-gray-600">
                Crear, editar y eliminar almacenes del sistema
              </p>
            </div>
          </Link>

          {/* Envíos Card */}
          <Link href="/admin/envios">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border-t-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <FiTruck className="w-12 h-12 text-purple-500" />
                <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded">
                  Gestionar
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Envíos</h2>
              <p className="text-gray-600">
                Crear, editar y eliminar transportistas y envíos
              </p>
            </div>
          </Link>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Bienvenido al Panel de Administración
          </h3>
          <p className="text-blue-800">
            Desde aquí puedes gestionar todos los datos maestros del sistema:
            clientes, almacenes y transportistas de fletes. Selecciona una
            opción para comenzar.
          </p>
        </div>
      </div>
    </div>
  );
}

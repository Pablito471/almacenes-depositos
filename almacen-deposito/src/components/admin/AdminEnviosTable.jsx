"use client";

import { FiEdit2, FiTrash2, FiRotateCcw } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAdmin } from "@/context/AdminContext";

export default function AdminEnviosTable({ envios, onEdit }) {
  const { deleteEnvio, restoreEnvio, allEnvios } = useAdmin();

  const handleDelete = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar envío?",
      text: `¿Está seguro de que desea eliminar a ${nombre}? Puede ser restaurado después.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEnvio(id);
        Swal.fire(
          "Eliminado",
          "El envío ha sido marcado como eliminado.",
          "success",
        );
      }
    });
  };

  const handleRestore = (id, nombre) => {
    Swal.fire({
      title: "¿Restaurar envío?",
      text: `¿Desea restaurar a ${nombre}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        restoreEnvio(id);
        Swal.fire("Restaurado", "El envío ha sido restaurado.", "success");
      }
    });
  };

  const deletedEnvios = allEnvios.filter((e) => e.deletedAt);

  if (envios.length === 0 && deletedEnvios.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center text-gray-500">
        No hay envíos registrados
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabla de envíos activos */}
      {envios.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-purple-50 border-b border-purple-200">
            <h3 className="font-semibold text-purple-900">
              Envíos Activos ({envios.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50 border-b-2 border-purple-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                    Transportista
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-purple-900">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-purple-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {envios.map((envio) => (
                  <tr key={envio.id} className="border-b hover:bg-purple-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {envio.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {envio.empresa}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {envio.telefono || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {envio.tipoVehiculo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          envio.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : envio.estado === "inactivo"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {envio.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onEdit(envio)}
                          className="p-2 text-purple-500 hover:bg-purple-100 rounded transition"
                          title="Editar"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(envio.id, envio.nombre)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded transition"
                          title="Eliminar"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabla de envíos eliminados */}
      {deletedEnvios.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-300">
          <div className="px-6 py-4 bg-red-50 border-b border-red-200">
            <h3 className="font-semibold text-red-900">
              Envíos Eliminados ({deletedEnvios.length})
            </h3>
            <p className="text-xs text-red-700">
              Estos envíos pueden ser restaurados
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50 border-b-2 border-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Transportista
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Eliminado
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-red-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {deletedEnvios.map((envio) => (
                  <tr
                    key={envio.id}
                    className="border-b hover:bg-red-50 opacity-75"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 line-through">
                      {envio.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {envio.empresa}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {envio.tipoVehiculo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      {new Date(envio.deletedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleRestore(envio.id, envio.nombre)}
                        className="p-2 text-orange-500 hover:bg-orange-100 rounded transition"
                        title="Restaurar"
                      >
                        <FiRotateCcw size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

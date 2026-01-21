"use client";

import { FiEdit2, FiTrash2, FiRotateCcw } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAdmin } from "@/context/AdminContext";

export default function AdminFletesTable({ fletes, onEdit }) {
  const { deleteFlete, restoreFlete, allFletes } = useAdmin();

  const handleDelete = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar flete?",
      text: `¿Está seguro de que desea eliminar a ${nombre}? Puede ser restaurado después.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFlete(id);
        Swal.fire(
          "Eliminado",
          "El flete ha sido marcado como eliminado.",
          "success",
        );
      }
    });
  };

  const handleRestore = (id, nombre) => {
    Swal.fire({
      title: "¿Restaurar flete?",
      text: `¿Desea restaurar a ${nombre}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        restoreFlete(id);
        Swal.fire("Restaurado", "El flete ha sido restaurado.", "success");
      }
    });
  };

  const deletedFletes = allFletes.filter((f) => f.deletedAt);

  if (fletes.length === 0 && deletedFletes.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center text-gray-500">
        No hay fletes registrados
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabla de fletes activos */}
      {fletes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-purple-50 border-b border-purple-200">
            <h3 className="font-semibold text-purple-900">
              Fletes Activos ({fletes.length})
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
                {fletes.map((flete) => (
                  <tr key={flete.id} className="border-b hover:bg-purple-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {flete.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {flete.empresa}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {flete.telefono || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {flete.tipoVehiculo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          flete.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : flete.estado === "inactivo"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {flete.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onEdit(flete)}
                          className="p-2 text-purple-500 hover:bg-purple-100 rounded transition"
                          title="Editar"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(flete.id, flete.nombre)}
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

      {/* Tabla de fletes eliminados */}
      {deletedFletes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-300">
          <div className="px-6 py-4 bg-red-50 border-b border-red-200">
            <h3 className="font-semibold text-red-900">
              Fletes Eliminados ({deletedFletes.length})
            </h3>
            <p className="text-xs text-red-700">
              Estos fletes pueden ser restaurados
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
                {deletedFletes.map((flete) => (
                  <tr
                    key={flete.id}
                    className="border-b hover:bg-red-50 opacity-75"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 line-through">
                      {flete.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {flete.empresa}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {flete.tipoVehiculo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      {new Date(flete.deletedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleRestore(flete.id, flete.nombre)}
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

"use client";

import { FiEdit2, FiTrash2, FiRotateCcw } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAdmin } from "@/context/AdminContext";

export default function AdminClientesTable({ clientes, onEdit }) {
  const { deleteCliente, restoreCliente, allClientes } = useAdmin();

  const handleDelete = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar cliente?",
      text: `¿Está seguro de que desea eliminar a ${nombre}? Puede ser restaurado después.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCliente(id);
        Swal.fire(
          "Eliminado",
          "El cliente ha sido marcado como eliminado.",
          "success",
        );
      }
    });
  };

  const handleRestore = (id, nombre) => {
    Swal.fire({
      title: "¿Restaurar cliente?",
      text: `¿Desea restaurar a ${nombre}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        restoreCliente(id);
        Swal.fire("Restaurado", "El cliente ha sido restaurado.", "success");
      }
    });
  };

  const deletedClientes = allClientes.filter((c) => c.deletedAt);

  if (clientes.length === 0 && deletedClientes.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center text-gray-500">
        No hay clientes registrados
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabla de clientes activos */}
      {clientes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900">
              Clientes Activos ({clientes.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b-2 border-blue-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-blue-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b hover:bg-blue-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {cliente.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.telefono || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.empresa || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cliente.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : cliente.estado === "inactivo"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {cliente.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onEdit(cliente)}
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded transition"
                          title="Editar"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(cliente.id, cliente.nombre)
                          }
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

      {/* Tabla de clientes eliminados */}
      {deletedClientes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-300">
          <div className="px-6 py-4 bg-red-50 border-b border-red-200">
            <h3 className="font-semibold text-red-900">
              Clientes Eliminados ({deletedClientes.length})
            </h3>
            <p className="text-xs text-red-700">
              Estos clientes pueden ser restaurados
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50 border-b-2 border-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Empresa
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
                {deletedClientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-b hover:bg-red-50 opacity-75"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 line-through">
                      {cliente.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {cliente.empresa || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      {new Date(cliente.deletedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handleRestore(cliente.id, cliente.nombre)
                        }
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

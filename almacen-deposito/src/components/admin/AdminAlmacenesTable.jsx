"use client";

import { FiEdit2, FiTrash2, FiRotateCcw } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAdmin } from "@/context/AdminContext";

export default function AdminAlmacenesTable({ almacenes, onEdit }) {
  const { deleteAlmacen, restoreAlmacen, allAlmacenes } = useAdmin();

  const handleDelete = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar almacén?",
      text: `¿Está seguro de que desea eliminar ${nombre}? Puede ser restaurado después.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAlmacen(id);
        Swal.fire(
          "Eliminado",
          "El almacén ha sido marcado como eliminado.",
          "success",
        );
      }
    });
  };

  const handleRestore = (id, nombre) => {
    Swal.fire({
      title: "¿Restaurar almacén?",
      text: `¿Desea restaurar ${nombre}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        restoreAlmacen(id);
        Swal.fire("Restaurado", "El almacén ha sido restaurado.", "success");
      }
    });
  };

  const deletedAlmacenes = allAlmacenes.filter((a) => a.deletedAt);

  if (almacenes.length === 0 && deletedAlmacenes.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center text-gray-500">
        No hay almacenes registrados
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabla de almacenes activos */}
      {almacenes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-green-50 border-b border-green-200">
            <h3 className="font-semibold text-green-900">
              Almacenes Activos ({almacenes.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50 border-b-2 border-green-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-900">
                    Foto
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-900">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-900">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-900">
                    Capacidad
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-900">
                    Responsable
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-green-900">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-green-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {almacenes.map((almacen) => (
                  <tr key={almacen.id} className="border-b hover:bg-green-50">
                    <td className="px-6 py-4 text-sm">
                      {almacen.foto ? (
                        <img
                          src={almacen.foto}
                          alt={almacen.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          Sin foto
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {almacen.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {almacen.ubicacion}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {almacen.capacidad || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {almacen.responsable || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          almacen.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : almacen.estado === "inactivo"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {almacen.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onEdit(almacen)}
                          className="p-2 text-green-500 hover:bg-green-100 rounded transition"
                          title="Editar"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(almacen.id, almacen.nombre)
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

      {/* Tabla de almacenes eliminados */}
      {deletedAlmacenes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-300">
          <div className="px-6 py-4 bg-red-50 border-b border-red-200">
            <h3 className="font-semibold text-red-900">
              Almacenes Eliminados ({deletedAlmacenes.length})
            </h3>
            <p className="text-xs text-red-700">
              Estos almacenes pueden ser restaurados
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50 border-b-2 border-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    {" "}
                    Foto
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    {" "}
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-red-900">
                    Responsable
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
                {deletedAlmacenes.map((almacen) => (
                  <tr
                    key={almacen.id}
                    className="border-b hover:bg-red-50 opacity-75"
                  >
                    <td className="px-6 py-4 text-sm">
                      {almacen.foto ? (
                        <img
                          src={almacen.foto}
                          alt={almacen.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          Sin foto
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 line-through">
                      {almacen.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {almacen.ubicacion}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {almacen.responsable || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600">
                      {new Date(almacen.deletedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handleRestore(almacen.id, almacen.nombre)
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

import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck } from "react-icons/fi";

export default function AlmacenSelector({
  almacenes,
  almacenSeleccionado,
  onSelect,
  mostrarDetalles = true,
  variant = "grid", // 'grid', 'list', 'select'
}) {
  if (almacenes.length === 0) {
    return <p className="text-gray-500">No hay almacenes disponibles</p>;
  }

  if (variant === "select") {
    return (
      <select
        value={almacenSeleccionado}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
      >
        {almacenes.map((almacen) => (
          <option key={almacen.id} value={almacen.id}>
            {almacen.nombre} - {almacen.ubicacion}
          </option>
        ))}
      </select>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-3">
        {almacenes.map((almacen) => (
          <button
            key={almacen.id}
            onClick={() => onSelect(almacen.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              almacenSeleccionado === almacen.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  {almacen.nombre}
                  {almacenSeleccionado === almacen.id && (
                    <FiCheck className="text-green-600" />
                  )}
                </h3>
                {mostrarDetalles && (
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiMapPin size={16} className="text-blue-600" />
                      {almacen.ubicacion}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone size={16} className="text-blue-600" />
                      {almacen.telefono}
                    </div>
                    {almacen.email && (
                      <div className="flex items-center gap-2">
                        <FiMail size={16} className="text-blue-600" />
                        {almacen.email}
                      </div>
                    )}
                    {almacen.horario && (
                      <div className="flex items-center gap-2">
                        <FiClock size={16} className="text-blue-600" />
                        {almacen.horario}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {almacen.estado && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    almacen.estado === "Activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {almacen.estado}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }

  // variant === 'grid' (por defecto)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {almacenes.map((almacen) => (
        <button
          key={almacen.id}
          onClick={() => onSelect(almacen.id)}
          className={`text-left p-6 rounded-lg border-2 transition-all ${
            almacenSeleccionado === almacen.id
              ? "border-blue-600 bg-blue-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-blue-300"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              {almacen.nombre}
              {almacenSeleccionado === almacen.id && (
                <FiCheck className="text-green-600" size={20} />
              )}
            </h3>
            {almacen.estado && (
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  almacen.estado === "Activo"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {almacen.estado}
              </span>
            )}
          </div>

          {mostrarDetalles && (
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiMapPin size={16} className="text-blue-600 flex-shrink-0" />
                <span>{almacen.ubicacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone size={16} className="text-blue-600 flex-shrink-0" />
                <span>{almacen.telefono}</span>
              </div>
              {almacen.email && (
                <div className="flex items-center gap-2">
                  <FiMail size={16} className="text-blue-600 flex-shrink-0" />
                  <span className="truncate">{almacen.email}</span>
                </div>
              )}
              {almacen.horario && (
                <div className="flex items-center gap-2">
                  <FiClock size={16} className="text-blue-600 flex-shrink-0" />
                  <span>{almacen.horario}</span>
                </div>
              )}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

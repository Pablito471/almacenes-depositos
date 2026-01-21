"use client";

import { useAdmin } from "@/context/AdminContext";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiMapPin, FiPhone, FiMail, FiBox } from "react-icons/fi";

export default function AlmacenesPage() {
  const { almacenes } = useAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="p-2 hover:bg-gray-200 rounded transition">
              <FiArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Nuestros Almacenes
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Conoce nuestras ubicaciones y servicios
              </p>
            </div>
          </div>
        </div>

        {/* Grid de Almacenes */}
        {almacenes.length === 0 ? (
          <div className="bg-white p-12 rounded-lg text-center text-gray-500">
            <p className="text-lg">
              No hay almacenes disponibles en este momento
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {almacenes.map((almacen) => (
              <div
                key={almacen.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden border-t-4 border-green-500"
              >
                {/* Foto */}
                {almacen.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={almacen.foto}
                    alt={almacen.nombre}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center">
                    <FiBox size={64} className="text-green-400" />
                  </div>
                )}

                {/* Contenido */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {almacen.nombre}
                  </h2>

                  {/* Ubicación */}
                  <div className="flex items-start gap-3 mb-4">
                    <FiMapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Ubicación
                      </p>
                      <p className="text-gray-600">{almacen.ubicacion}</p>
                    </div>
                  </div>

                  {/* Capacidad */}
                  {almacen.capacidad && (
                    <div className="flex items-start gap-3 mb-4">
                      <FiBox className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Capacidad
                        </p>
                        <p className="text-gray-600">{almacen.capacidad}</p>
                      </div>
                    </div>
                  )}

                  {/* Responsable */}
                  {almacen.responsable && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Responsable
                      </p>
                      <p className="text-gray-600">{almacen.responsable}</p>
                    </div>
                  )}

                  {/* Contacto */}
                  <div className="border-t pt-4 mt-4">
                    {almacen.telefono && (
                      <div className="flex items-center gap-2 mb-2">
                        <FiPhone className="w-4 h-4 text-green-600" />
                        <a
                          href={`tel:${almacen.telefono}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          {almacen.telefono}
                        </a>
                      </div>
                    )}
                    {almacen.email && (
                      <div className="flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-green-600" />
                        <a
                          href={`mailto:${almacen.email}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          {almacen.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Estado */}
                  <div className="mt-4 pt-4 border-t">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        almacen.estado === "activo"
                          ? "bg-green-100 text-green-800"
                          : almacen.estado === "inactivo"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {almacen.estado === "activo"
                        ? "Abierto"
                        : almacen.estado === "inactivo"
                          ? "Cerrado"
                          : "En mantenimiento"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

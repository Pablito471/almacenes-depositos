"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2, FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAdmin } from "@/context/AdminContext";

export default function AdminAlmacenesForm({ almacenActual, onClose }) {
  const { addAlmacen, updateAlmacen } = useAdmin();
  const [formData, setFormData] = useState(
    almacenActual || {
      nombre: "",
      ubicacion: "",
      capacidad: "",
      responsable: "",
      telefono: "",
      email: "",
      estado: "activo",
      foto: null,
    },
  );
  const [previewFoto, setPreviewFoto] = useState(almacenActual?.foto || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setFormData((prev) => ({
          ...prev,
          foto: base64,
        }));
        setPreviewFoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.ubicacion) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Nombre y ubicación son obligatorios",
      });
      return;
    }

    if (almacenActual) {
      updateAlmacen(almacenActual.id, formData);
      Swal.fire({
        icon: "success",
        title: "Almacén actualizado",
        text: "Los datos del almacén se han actualizado correctamente",
      });
    } else {
      addAlmacen(formData);
      Swal.fire({
        icon: "success",
        title: "Almacén creado",
        text: "El nuevo almacén ha sido creado correctamente",
      });
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-lg font-bold mb-4">
        {almacenActual ? "Editar Almacén" : "Nuevo Almacén"}
      </h3>

      {/* Preview de foto */}
      {previewFoto && (
        <div className="mb-4">
          <img
            src={previewFoto}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upload de foto */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Foto del Local
          </label>
          <label className="flex items-center justify-center border-2 border-dashed border-green-300 rounded-lg p-4 cursor-pointer hover:bg-green-50 transition">
            <div className="text-center">
              <FiUpload size={24} className="mx-auto mb-2 text-green-500" />
              <span className="text-sm text-gray-600">
                {previewFoto ? "Cambiar foto" : "Seleccionar foto"}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del almacén"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ubicación *</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Dirección del almacén"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Capacidad</label>
          <input
            type="text"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            placeholder="Ej: 1000 unidades"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Responsable</label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            placeholder="Nombre del responsable"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="mantenimiento">En mantenimiento</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          {almacenActual ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

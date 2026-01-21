"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { useAdmin } from "@/context/AdminContext";

export default function AdminClientesForm({ clienteActual, onClose }) {
  const { addCliente, updateCliente } = useAdmin();
  const [formData, setFormData] = useState(
    clienteActual || {
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      ciudad: "",
      estado: "activo",
    },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Nombre y email son obligatorios",
      });
      return;
    }

    if (clienteActual) {
      updateCliente(clienteActual.id, formData);
      Swal.fire({
        icon: "success",
        title: "Cliente actualizado",
        text: "Los datos del cliente se han actualizado correctamente",
      });
    } else {
      addCliente(formData);
      Swal.fire({
        icon: "success",
        title: "Cliente creado",
        text: "El nuevo cliente ha sido creado correctamente",
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
        {clienteActual ? "Editar Cliente" : "Nuevo Cliente"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del cliente"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            placeholder="Nombre de la empresa"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            placeholder="Ciudad"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {clienteActual ? "Actualizar" : "Crear"}
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

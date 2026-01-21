"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import { FiCamera, FiSave, FiTrash2 } from "react-icons/fi";
import { alerts } from "@/utils/alerts";

export default function ProfileForm({
  profileData,
  onSave,
  roleLabel = "Usuario",
  fields = [],
}) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData || {});
  const [imagePreview, setImagePreview] = useState(profileData?.foto || null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validar campos requeridos
    const requiredFields = ["nombre", "email", "telefono"];
    const missingFields = requiredFields.filter((f) => !formData[f]);

    if (missingFields.length > 0) {
      alerts.warning(
        "Campos requeridos",
        `Completa: ${missingFields.join(", ")}`,
      );
      return;
    }

    onSave(formData);
    setIsEditing(false);
    alerts.success(
      "Perfil actualizado",
      "Tus datos fueron guardados correctamente",
    );
  };

  const handleCancel = () => {
    setFormData(profileData || {});
    setImagePreview(profileData?.foto || null);
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    const result = await alerts.confirm(
      "⚠️ Eliminar Cuenta",
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y se perderán todos tus datos.",
      "warning",
    );

    if (result.isConfirmed) {
      // Segunda confirmación con el email
      const confirmEmail = await alerts.prompt(
        "Confirmar Eliminación",
        `Por favor, escribe tu email (${formData.email}) para confirmar la eliminación:`,
      );

      if (confirmEmail && confirmEmail.value === formData.email) {
        // Simular eliminación de cuenta
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("profile");
        localStorage.removeItem("pedidos");
        localStorage.removeItem("almacenSeleccionado");

        alerts.success(
          "Cuenta Eliminada",
          "Tu cuenta ha sido eliminada correctamente. Serás redirigido al inicio.",
        );

        // Ejecutar logout y redirigir
        logout();
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else if (confirmEmail && confirmEmail.isConfirmed) {
        alerts.error(
          "Email No Coincide",
          "El email que ingresaste no coincide. Tu cuenta no fue eliminada.",
        );
      }
    }
  };

  return (
    <Card className="max-w-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Foto de Perfil */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-blue-300">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                <FiCamera size={48} />
              </div>
            )}
          </div>

          {isEditing && (
            <div className="relative">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <FiCamera /> Cambiar Foto
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}

          <p className="text-sm text-gray-600 mt-4 font-semibold">
            {formData.nombre || roleLabel}
          </p>
          <p className="text-xs text-gray-500">
            {formData.email || "sin email"}
          </p>
        </div>

        {/* Formulario de Datos */}
        <div className="flex-1">
          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="text-lg font-semibold">
                    {formData.nombre || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold">
                    {formData.email || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="text-lg font-semibold">
                    {formData.telefono || "No especificado"}
                  </p>
                </div>

                {formData.dni && (
                  <div>
                    <p className="text-sm text-gray-600">DNI/RFC</p>
                    <p className="text-lg font-semibold">{formData.dni}</p>
                  </div>
                )}

                {formData.direccion && (
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="text-lg font-semibold">
                      {formData.direccion}
                    </p>
                  </div>
                )}

                {formData.empresa && (
                  <div>
                    <p className="text-sm text-gray-600">Empresa</p>
                    <p className="text-lg font-semibold">{formData.empresa}</p>
                  </div>
                )}
              </div>

              <Button
                variant="primary"
                className="w-full mt-6 flex items-center justify-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <Input
                label="Nombre Completo"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />

              <Input
                label="Email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                label="Teléfono"
                value={formData.telefono || ""}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />

              <Input
                label="DNI / RFC"
                value={formData.dni || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dni: e.target.value })
                }
                placeholder="Ej: 12345678-A o XXX123456ABC12"
              />

              <Input
                label="Dirección"
                value={formData.direccion || ""}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
                placeholder="Calle, número, ciudad"
              />

              {(formData.empresa || roleLabel !== "Usuario") && (
                <Input
                  label="Empresa / Razón Social"
                  value={formData.empresa || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, empresa: e.target.value })
                  }
                />
              )}

              <div className="flex gap-2">
                <Button
                  variant="success"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleSave}
                >
                  <FiSave /> Guardar Cambios
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sección de Peligro - Eliminar Cuenta */}
      <div className="mt-8 pt-8 border-t-2 border-red-200">
        <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
          <FiTrash2 /> Zona de Peligro
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor,
          asegúrate.
        </p>

        {!showDeleteConfirm ? (
          <Button
            variant="ghost"
            className="text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <FiTrash2 /> Eliminar Cuenta
          </Button>
        ) : (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-3">
              ¿Realmente deseas eliminar tu cuenta?
            </h4>
            <p className="text-sm text-red-700 mb-4">
              Se eliminarán permanentemente:
            </p>
            <ul className="text-sm text-red-700 list-disc list-inside mb-4 space-y-1">
              <li>Tu perfil y datos personales</li>
              <li>Historial de pedidos</li>
              <li>Preferencias y configuración</li>
              <li>Toda tu información de cuenta</li>
            </ul>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-100"
                onClick={handleDeleteAccount}
              >
                Sí, Eliminar Mi Cuenta
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

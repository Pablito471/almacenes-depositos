"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import ProfileForm from "@/components/common/ProfileForm";

export default function ClientePerfilPage() {
  const { loading } = useProtectedRoute("cliente");
  const { user, profile, updateProfile } = useAuth();

  const handleSaveProfile = (profileData) => {
    updateProfile({
      ...profileData,
      role: "cliente",
      userId: user?.id,
    });
  };

  if (loading)
    return (
      <MainLayout>
        <div className="text-center py-8">Cargando...</div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">
          Actualiza tus datos personales y fiscales
        </p>
      </div>

      <ProfileForm
        profileData={profile}
        onSave={handleSaveProfile}
        roleLabel="Cliente"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2">📋 Datos Personales</h3>
          <p className="text-sm text-gray-600">
            Asegúrate de que tu nombre y email sean correctos
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="font-bold text-gray-900 mb-2">🏠 Dirección</h3>
          <p className="text-sm text-gray-600">
            Usaremos tu dirección para enviar los pedidos
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="font-bold text-gray-900 mb-2">📸 Foto de Perfil</h3>
          <p className="text-sm text-gray-600">
            Sube una foto clara para identificarte
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

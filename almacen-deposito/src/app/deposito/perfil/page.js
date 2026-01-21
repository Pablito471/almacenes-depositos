"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import ProfileForm from "@/components/common/ProfileForm";
import Card from "@/components/common/Card";

export default function DepositoPerfilPage() {
  const { loading } = useProtectedRoute("deposito");
  const { user, profile, updateProfile } = useAuth();

  const handleSaveProfile = (profileData) => {
    updateProfile({
      ...profileData,
      role: "deposito",
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Perfil del Almacén
        </h1>
        <p className="text-gray-600">
          Gestiona los datos de tu almacén y documentación fiscal
        </p>
      </div>

      <ProfileForm
        profileData={profile}
        onSave={handleSaveProfile}
        roleLabel="Almacén"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-orange-50 border-2 border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            📦 Información del Almacén
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Nombre del almacén</li>
            <li>✓ Razón social</li>
            <li>✓ RFC/DNI</li>
            <li>✓ Dirección registrada</li>
            <li>✓ Teléfono de contacto</li>
          </ul>
        </Card>

        <Card className="bg-red-50 border-2 border-red-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            📋 Documentación Fiscal
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ RFC válido</li>
            <li>✓ Regimen fiscal</li>
            <li>✓ Datos bancarios (próximamente)</li>
            <li>✓ Certificado de operaciones (próximamente)</li>
            <li>✓ Comprobantes de domicilio</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6 bg-blue-50 border-l-4 border-blue-600">
        <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Importante</h3>
        <p className="text-sm text-gray-700">
          Los datos fiscales son necesarios para emitir facturas y cumplir con
          las regulaciones. Asegúrate de mantener esta información actualizada
          en todo momento.
        </p>
      </Card>
    </MainLayout>
  );
}

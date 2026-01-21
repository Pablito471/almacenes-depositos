"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import ProfileForm from "@/components/common/ProfileForm";
import Card from "@/components/common/Card";

export default function EnviosPerfilPage() {
  const { loading } = useProtectedRoute("envios");
  const { user, profile, updateProfile } = useAuth();

  const handleSaveProfile = (profileData) => {
    updateProfile({
      ...profileData,
      role: "envios",
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
          Perfil de Envíos
        </h1>
        <p className="text-gray-600">
          Mantén actualizada tu información de contacto y documentación
        </p>
      </div>

      <ProfileForm
        profileData={profile}
        onSave={handleSaveProfile}
        roleLabel="Empresa de Envíos"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-green-50 border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            🚚 Datos de la Empresa
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Nombre de la empresa</li>
            <li>✓ Razón social</li>
            <li>✓ RFC</li>
            <li>✓ Teléfono de contacto</li>
            <li>✓ Dirección de cobertura</li>
          </ul>
        </Card>

        <Card className="bg-cyan-50 border-2 border-cyan-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            📱 Contacto de Emergencia
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Teléfono principal</li>
            <li>✓ Email de contacto</li>
            <li>✓ Jefe/Supervisor</li>
            <li>✓ Horario de atención</li>
            <li>✓ Cobertura geográfica</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6 bg-yellow-50 border-l-4 border-yellow-600">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          🚗 Estado de Entrega
        </h3>
        <p className="text-sm text-gray-700">Con tu perfil completo, podrás:</p>
        <ul className="text-sm text-gray-700 mt-3 space-y-1">
          <li>• Recibir asignaciones de entregas</li>
          <li>• Actualizar estados en tiempo real</li>
          <li>• Generar reportes de entregas</li>
          <li>• Comunicarte con clientes</li>
          <li>• Recibir pagos de entregas</li>
        </ul>
      </Card>
    </MainLayout>
  );
}

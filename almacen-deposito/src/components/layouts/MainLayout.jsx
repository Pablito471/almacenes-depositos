"use client";

import Header from "@/components/common/Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6 md:py-8 animate-fade-in-up">
        {children}
      </main>
      <footer className="bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800 py-8 mt-12 shadow-soft-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold">
            &copy; 2026 AlmacenesHub. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Plataforma segura de gestión de almacenes
          </p>
        </div>
      </footer>
    </div>
  );
}

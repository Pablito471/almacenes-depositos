"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getRoleLabel = () => {
    const labels = {
      cliente: "Cliente",
      deposito: "Almacén",
      envios: "Envíos",
    };
    return labels[role] || "";
  };

  const getNavLinks = () => {
    const links = {
      cliente: [
        { label: "Buscar Productos", href: "/cliente/productos" },
        { label: "Mis Pedidos", href: "/cliente/pedidos" },
      ],
      deposito: [
        { label: "Productos", href: "/deposito/productos" },
        { label: "Pedidos", href: "/deposito/pedidos" },
      ],
      envios: [
        { label: "Entregas", href: "/envios/entregas" },
        { label: "Historial", href: "/envios/historial" },
      ],
    };
    return links[role] || [];
  };

  if (!user) return null;

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          📦 AlmacenesHub
        </Link>

        {/* Menu mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-6">
          {getNavLinks().map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-200 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
            {getRoleLabel()}
          </span>
          <span className="text-sm truncate max-w-32">
            {user.nombre || user.email}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-blue-700"
          >
            <FiLogOut className="inline mr-2" /> Salir
          </Button>
        </div>

        {/* Menu mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-blue-700 rounded-lg shadow-lg p-4 md:hidden w-48">
            {getNavLinks().map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 hover:text-blue-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-blue-600 mt-4 pt-4">
              <p className="text-sm mb-2">{getRoleLabel()}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-blue-700 w-full"
              >
                <FiLogOut className="inline mr-2" /> Salir
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

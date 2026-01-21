"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAlmacenes } from "@/context/AlmacenesContext";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { FiLogOut, FiMenu, FiX, FiMapPin, FiUser } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const { user, role, profile, logout } = useAuth();
  const { obtenerAlmacenActual, seleccionarAlmacen, almacenes } =
    useAlmacenes();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [almacenesDropdownOpen, setAlmacenesDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const almacenActual = obtenerAlmacenActual();

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

  const getProfileLink = () => {
    const links = {
      cliente: "/cliente/perfil",
      deposito: "/deposito/perfil",
      envios: "/envios/perfil",
    };
    return links[role] || "/";
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

  const mostrarSelectorAlmacen = role === "cliente" && almacenes.length > 0;

  if (!user) return null;

  return (
    <header className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-gray-800 shadow-soft-lg sticky top-0 z-40 animate-fade-in-up">
      <nav className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold whitespace-nowrap"
          >
            📦 AlmacenesHub
          </Link>

          {/* Menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-smooth"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6 flex-wrap">
            {getNavLinks().map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-smooth text-sm lg:text-base"
              >
                {link.label}
              </Link>
            ))}

            {/* Selector de Almacén para Cliente */}
            {mostrarSelectorAlmacen && (
              <div className="relative">
                <button
                  onClick={() =>
                    setAlmacenesDropdownOpen(!almacenesDropdownOpen)
                  }
                  className="text-sm bg-white bg-opacity-20 hover:bg-opacity-40 px-3 py-2 rounded-lg flex items-center gap-2 transition-smooth"
                >
                  <FiMapPin size={16} />
                  <span className="truncate max-w-32">
                    {almacenActual?.nombre || "Almacén"}
                  </span>
                </button>

                {almacenesDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-soft-lg p-2 w-56 z-50 animate-fade-in-up">
                    {almacenes.map((almacen) => (
                      <button
                        key={almacen.id}
                        onClick={() => {
                          seleccionarAlmacen(almacen.id);
                          setAlmacenesDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-smooth ${
                          almacenActual?.id === almacen.id
                            ? "bg-gradient-to-r from-purple-200 to-pink-200 text-gray-900 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <p className="font-medium">{almacen.nombre}</p>
                        <p className="text-xs text-gray-600">
                          {almacen.ubicacion}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <span className="text-sm bg-white bg-opacity-20 px-3 py-2 rounded-lg">
              {getRoleLabel()}
            </span>

            {/* Perfil dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-smooth"
              >
                {profile?.foto ? (
                  <img
                    src={profile.foto}
                    alt="Perfil"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-soft"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <FiUser size={16} />
                  </div>
                )}
                <span className="text-sm truncate max-w-32 hidden lg:inline">
                  {profile?.nombre || user.nombre || user.email}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-soft-lg w-48 z-50 overflow-hidden animate-fade-in-up">
                  <Link
                    href={getProfileLink()}
                    className="block px-4 py-3 hover:bg-purple-100 transition-smooth flex items-center gap-2 text-gray-700 border-b border-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FiUser size={16} /> Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-rose-100 transition-smooth flex items-center gap-2 text-rose-600 font-medium"
                  >
                    <FiLogOut size={16} /> Salir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-white bg-opacity-10 rounded-xl p-4 space-y-3 animate-slide-in-down">
            {getNavLinks().map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-3 hover:bg-white hover:bg-opacity-20 rounded-lg transition-smooth text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Selector de Almacén móvil */}
            {mostrarSelectorAlmacen && (
              <div className="border-t border-white border-opacity-30 mt-3 pt-3">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <FiMapPin size={16} />
                  Almacén
                </p>
                <div className="space-y-2 ml-4">
                  {almacenes.map((almacen) => (
                    <button
                      key={almacen.id}
                      onClick={() => {
                        seleccionarAlmacen(almacen.id);
                        setMenuOpen(false);
                      }}
                      className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-smooth ${
                        almacenActual?.id === almacen.id
                          ? "bg-white bg-opacity-30 font-semibold"
                          : "hover:bg-white hover:bg-opacity-20"
                      }`}
                    >
                      {almacen.nombre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white border-opacity-30 mt-3 pt-3">
              <p className="text-sm font-semibold mb-2">{getRoleLabel()}</p>
              <Link
                href={getProfileLink()}
                className="block py-2 px-3 text-sm hover:bg-white hover:bg-opacity-20 rounded-lg flex items-center gap-2 mb-2 transition-smooth"
                onClick={() => setMenuOpen(false)}
              >
                <FiUser size={16} /> Mi Perfil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-sm hover:bg-rose-100 hover:text-rose-700 rounded-lg flex items-center gap-2 text-rose-600 font-medium transition-smooth"
              >
                <FiLogOut size={16} /> Salir
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

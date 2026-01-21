"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { loginService } from "@/services/authService";

const AlmacenesContext = createContext();

export function AlmacenesProvider({ children }) {
  const [almacenes, setAlmacenes] = useState([]);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("almacenSeleccionado");
  });
  const [loading, setLoading] = useState(true);

  // Cargar almacenes al inicializar
  useEffect(() => {
    const loadAlmacenes = async () => {
      try {
        const datos = await loginService.getDepositos();
        setAlmacenes(datos);

        // Si no hay uno seleccionado, seleccionar el primero
        const storedAlmacen = localStorage.getItem("almacenSeleccionado");
        if (!storedAlmacen && datos.length > 0) {
          setAlmacenSeleccionado(datos[0].id);
          localStorage.setItem("almacenSeleccionado", datos[0].id);
        }
      } catch (error) {
        console.error("Error cargando almacenes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlmacenes();
  }, []);

  const seleccionarAlmacen = (almacenId) => {
    const almacen = almacenes.find((a) => a.id === almacenId);
    if (almacen) {
      setAlmacenSeleccionado(almacenId);
      localStorage.setItem("almacenSeleccionado", almacenId);
    }
  };

  const obtenerAlmacenActual = () => {
    return almacenes.find((a) => a.id === almacenSeleccionado);
  };

  return (
    <AlmacenesContext.Provider
      value={{
        almacenes,
        almacenSeleccionado,
        loading,
        seleccionarAlmacen,
        obtenerAlmacenActual,
      }}
    >
      {children}
    </AlmacenesContext.Provider>
  );
}

export function useAlmacenes() {
  const context = useContext(AlmacenesContext);
  if (!context) {
    throw new Error("useAlmacenes debe ser usado dentro de AlmacenesProvider");
  }
  return context;
}

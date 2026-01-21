"use client";

import { createContext, useContext, useState, useCallback } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [clientes, setClientes] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(false);

  // CLIENTES
  const addCliente = useCallback((cliente) => {
    const nuevoCliente = {
      ...cliente,
      id: Date.now(),
      fechaRegistro: new Date().toLocaleDateString(),
      deletedAt: null,
    };
    setClientes((prev) => [...prev, nuevoCliente]);
    return nuevoCliente;
  }, []);

  const updateCliente = useCallback((id, clienteActualizado) => {
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.id === id ? { ...cliente, ...clienteActualizado } : cliente,
      ),
    );
  }, []);

  const deleteCliente = useCallback((id) => {
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.id === id
          ? { ...cliente, deletedAt: new Date().toISOString() }
          : cliente,
      ),
    );
  }, []);

  const restoreCliente = useCallback((id) => {
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.id === id ? { ...cliente, deletedAt: null } : cliente,
      ),
    );
  }, []);

  // ALMACENES
  const addAlmacen = useCallback((almacen) => {
    const nuevoAlmacen = {
      ...almacen,
      id: Date.now(),
      fechaCreacion: new Date().toLocaleDateString(),
      deletedAt: null,
    };
    setAlmacenes((prev) => [...prev, nuevoAlmacen]);
    return nuevoAlmacen;
  }, []);

  const updateAlmacen = useCallback((id, almacenActualizado) => {
    setAlmacenes((prev) =>
      prev.map((almacen) =>
        almacen.id === id ? { ...almacen, ...almacenActualizado } : almacen,
      ),
    );
  }, []);

  const deleteAlmacen = useCallback((id) => {
    setAlmacenes((prev) =>
      prev.map((almacen) =>
        almacen.id === id
          ? { ...almacen, deletedAt: new Date().toISOString() }
          : almacen,
      ),
    );
  }, []);

  const restoreAlmacen = useCallback((id) => {
    setAlmacenes((prev) =>
      prev.map((almacen) =>
        almacen.id === id ? { ...almacen, deletedAt: null } : almacen,
      ),
    );
  }, []);

  // ENVÍOS
  const addEnvio = useCallback((envio) => {
    const nuevoEnvio = {
      ...envio,
      id: Date.now(),
      fechaRegistro: new Date().toLocaleDateString(),
      deletedAt: null,
    };
    setEnvios((prev) => [...prev, nuevoEnvio]);
    return nuevoEnvio;
  }, []);

  const updateEnvio = useCallback((id, envioActualizado) => {
    setEnvios((prev) =>
      prev.map((envio) =>
        envio.id === id ? { ...envio, ...envioActualizado } : envio,
      ),
    );
  }, []);

  const deleteEnvio = useCallback((id) => {
    setEnvios((prev) =>
      prev.map((envio) =>
        envio.id === id
          ? { ...envio, deletedAt: new Date().toISOString() }
          : envio,
      ),
    );
  }, []);

  const restoreEnvio = useCallback((id) => {
    setEnvios((prev) =>
      prev.map((envio) =>
        envio.id === id ? { ...envio, deletedAt: null } : envio,
      ),
    );
  }, []);

  const value = {
    // Clientes
    clientes: clientes.filter((c) => !c.deletedAt),
    allClientes: clientes,
    addCliente,
    updateCliente,
    deleteCliente,
    restoreCliente,
    // Almacenes
    almacenes: almacenes.filter((a) => !a.deletedAt),
    allAlmacenes: almacenes,
    addAlmacen,
    updateAlmacen,
    deleteAlmacen,
    restoreAlmacen,
    // Envíos
    envios: envios.filter((e) => !e.deletedAt),
    allEnvios: envios,
    addEnvio,
    updateEnvio,
    deleteEnvio,
    restoreEnvio,
    // General
    loading,
    setLoading,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe ser usado dentro de AdminProvider");
  }
  return context;
}

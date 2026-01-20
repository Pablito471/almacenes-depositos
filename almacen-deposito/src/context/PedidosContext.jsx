"use client";

import { createContext, useContext, useState } from "react";

const PedidosContext = createContext();

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(() => {
    if (typeof window === "undefined") return [];
    const storedPedidos = localStorage.getItem("pedidos");
    return storedPedidos ? JSON.parse(storedPedidos) : [];
  });

  const [carrito, setCarrito] = useState(() => {
    if (typeof window === "undefined") return [];
    const storedCarrito = localStorage.getItem("carrito");
    return storedCarrito ? JSON.parse(storedCarrito) : [];
  });

  const agregarAlCarrito = (producto, cantidad, deposito) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.id === producto.id && item.deposito === deposito,
      );
      const nuevoCarrito = existe
        ? prev.map((item) =>
            item.id === producto.id && item.deposito === deposito
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item,
          )
        : [...prev, { ...producto, cantidad, deposito }];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prev) => {
      const nuevoCarrito = prev.filter((item) => item.id !== productoId);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  const crearPedido = (pedidoData) => {
    const nuevoPedido = {
      id: Date.now().toString(),
      ...pedidoData,
      fecha: new Date().toISOString(),
      estado: "pendiente",
    };
    setPedidos((prev) => {
      const nuevosPedidos = [...prev, nuevoPedido];
      localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
      return nuevosPedidos;
    });
    setCarrito([]);
    localStorage.removeItem("carrito");
    return nuevoPedido;
  };

  const actualizarEstadoPedido = (pedidoId, nuevoEstado) => {
    setPedidos((prev) => {
      const nuevosPedidos = prev.map((p) =>
        p.id === pedidoId ? { ...p, estado: nuevoEstado } : p,
      );
      localStorage.setItem("pedidos", JSON.stringify(nuevosPedidos));
      return nuevosPedidos;
    });
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        crearPedido,
        actualizarEstadoPedido,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos debe ser usado dentro de PedidosProvider");
  }
  return context;
}

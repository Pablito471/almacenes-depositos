"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    if (typeof window === "undefined") {
      return {
        user: null,
        role: null,
        loading: true,
      };
    }

    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      role: storedRole || null,
      loading: false,
    };
  });

  const login = (userData, userRole) => {
    setAuthState({
      user: userData,
      role: userRole,
      loading: false,
    });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setAuthState({
      user: null,
      role: null,
      loading: false,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        role: authState.role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
